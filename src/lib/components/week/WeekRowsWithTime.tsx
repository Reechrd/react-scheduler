import {Typography} from "@mui/material"
import {format} from "date-fns"
import React, {Fragment, memo} from "react"
import {GridTimeCell} from "../../styles/styles"
import {WeekEventRow} from "./WeekEventRow"
import BasicWeekRows from "./BasicWeekRows";

type Props = {
    rows: number[],
    columns: number[],
    isThereToday: boolean,
    todaysIndex: number
    step: number
    startHour: number,
    daysList: Date[],
}

type PropsExtended = Omit<Props & {
    hours: Date[],
}, 'hour' | 'hourIndex'>

export const WeekRowsWithTime = memo((props: PropsExtended) => {
    let hours: JSX.Element[] = []
    hours.push((
        <Fragment key={props.hours[0].toISOString()}>
            {/* Time cell */}
            <GridTimeCell>
                <Typography variant="caption">
                    {format(props.hours[0], "H:mm")}
                </Typography>
            </GridTimeCell>

            <WeekEventRow
                daysList={props.daysList}
                hour={props.hours[0]}
                startHour={props.startHour}
                step={props.step}
                rows={props.rows}
                columns={props.columns}
                row={0}
            />
        </Fragment>
	))
	hours.push(	<BasicWeekRows rows={props.rows} columns={props.columns} hours={props.hours} daysList={props.daysList} step={props.step} todaysIndex={props.todaysIndex}/>)

	return <>{hours}</>
})