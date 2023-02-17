import {addMinutes, differenceInDays, getHours, getMinutes, isSameDay, isToday, set} from "date-fns"
import React, {memo, ReactElement, useCallback, useMemo} from "react"
import {useCalendarProps} from "../../hooks/useCalendarProps"
import {useThrottledResizeObserver} from "../../hooks/useThrottledObserver"
import {WeekGridCell} from "../../styles/styles"
import {CalendarEvent} from "../../types"
import TodayEvents from "../events/TodayEvents"
import {onDragEnter, onDragLeave, onDragOver, onDrop} from "./weekGridEventHandlers";
import {ButtonBase, useTheme} from "@mui/material";

export type CellWithEventProps = {
    hour: Date,
    step: number,
    day: Date,
    startHour: number,
    events: CalendarEvent[]
    hourIndex: number
    column: number
}

export const WeekCellWithEvent = memo((props: CellWithEventProps): ReactElement => {
    const {direction, events, onEventDrop} = useCalendarProps()
    const {ref, height = 1} = useThrottledResizeObserver<HTMLButtonElement>(100)
    const minuteHeight = height / props.step
    const theme = useTheme()

    const start = set(props.day, {
        hours: getHours(props.hour),
        minutes: getMinutes(props.hour)
    })

    const end = addMinutes(start, props.step)

    const {onCellClick} = useCalendarProps()

    const onDragDrop = useCallback(e => {
        e.currentTarget.style.backgroundColor = ""
        const eventId = e.dataTransfer.getData("text")
        onDrop(eventId, start, onEventDrop, events)
    }, [])


    const todayEvents = useMemo(
        () => props.events
            .filter(
                (e) =>
                    isSameDay(props.day, e.start) &&
                    !differenceInDays(e.end, e.start)
            )
            .sort((a, b) => a.end.getTime() - b.end.getTime()),
        [props.events, props.day]
    )

    return (
        <WeekGridCell hour={getHours(props.hour)} weekend={props.column === 6 || props.column === 5} today={isToday((props.day))} ref={ref}>

            {/* Events of each day - run once on the top hour column */}
            <TodayEvents
                todayEvents={todayEvents}
                today={props.day}
                minuteHeight={minuteHeight}
                startHour={props.startHour}
                step={props.step}
                direction={direction ?? "ltr"}/>

            <ButtonBase
                onClick={(e)=> onCellClick && onCellClick(start, end, e) }
                onDragOver={(e) => onDragOver(e, theme)}
                onDragEnter={(e) => onDragEnter(e, theme)}
                onDragLeave={(e) => onDragLeave(e)}
                onDrop={(e)=>onDragDrop(e)}
            />
        </WeekGridCell>
    )
})