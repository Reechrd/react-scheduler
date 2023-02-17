import {GridTimeCell, WeekGridCell} from "../../styles/styles";
import {useCallback, useMemo} from "react";
import {ButtonBase, Typography, useTheme} from "@mui/material";
import {useCalendarProps} from "../../hooks/useCalendarProps";
import {addMinutes, format, getHours, getMinutes, set} from "date-fns";
import {onDragEnter, onDragLeave, onDragOver, onDrop} from "./weekGridEventHandlers";

type PropsBasicRow = {
    rows: number[]
    columns: number[]
    todaysIndex: number
    daysList: Date[]
    step: number
    hours: Date[]
}

const BasicWeekRows = (props: PropsBasicRow) => {
    const {onCellClick, events, onEventDrop} = useCalendarProps()
    const theme = useTheme()

    const getStart = (row: number, column: number) => set(props.daysList[column], {
        hours: getHours(props.hours[row]),
        minutes: getMinutes(props.hours[row])
    })
    const getEnd = (row: number, column: number) => addMinutes(getStart(row, column), props.step)

    const onClick = useCallback((e, row: number, column: number) => {
        if (onCellClick) {
            onCellClick(getStart(row, column), getEnd(row, column), e)
        }
    }, [onCellClick])

    const onDragDrop = useCallback((e, row: number, column: number) => {
        e.currentTarget.style.backgroundColor = ""
        const eventId = e.dataTransfer.getData("text")

        onDrop(eventId, getStart(row, column), onEventDrop, events)
    }, [])

    const Rows: JSX.Element[][] = useMemo(() => {
        let tempRows: JSX.Element[][] = []

        for (let row = 1; row < props.rows.length; row++) {
            let tempColumns: JSX.Element[] = [<GridTimeCell>
                <Typography variant="caption">
                    {format(props.hours[row], "H:mm")}
                </Typography>
            </GridTimeCell>]
            for (let column = 0; column < props.columns.length; column++) {

                tempColumns = [...tempColumns,
                    <WeekGridCell className={"ID" + row + " " + column} weekend={column === 5 || column === 6}
                                  hour={Math.floor((row * props.step) / 60)} today={column === props.todaysIndex}>
                        <ButtonBase
                            onClick={(e) => onClick(e, row, column)}
                            onDragOver={(e) => onDragOver(e, theme)}
                            onDragEnter={(e) => onDragEnter(e, theme)}
                            onDragLeave={(e) => onDragLeave(e)}
                            onDrop={(e) => onDragDrop(e, row, column)}
                        />
                    </WeekGridCell>]
            }

            tempRows = [...tempRows, tempColumns]
        }

        return tempRows
    }, [props.todaysIndex, props.step])

    return <>{Rows}</>
}

export default BasicWeekRows