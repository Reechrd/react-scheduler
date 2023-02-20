import {differenceInMinutes, set} from "date-fns"
import React, {Fragment, memo} from "react"
import {BORDER_HEIGHT} from "../../helpers/constants"
import {traversCrossingEvents} from "../../helpers/generals"
import {CalendarEvent} from "../../types"
import EventItem from "./EventItem"
import {useCalendarProps} from "../../hooks/useCalendarProps";
import {Badge} from "@mui/material";

interface TodayEventsProps {
    todayEvents: CalendarEvent[];
    today: Date;
    startHour: number;
    step: number;
    minuteHeight: number;
    direction: "rtl" | "ltr";
    columnWidth?: number;
}

const TodayEvents = memo(({
                              todayEvents,
                              today,
                              startHour,
                              step,
                              minuteHeight,
                              direction,
                              columnWidth
                          }: TodayEventsProps) => {

    const {onViewChange, onDateChange} = useCalendarProps()

    let overflowedEvents = 0

    const handleGotoDay = (day: Date) => {
        onViewChange?.('day')
        onDateChange?.(day)
    }

    let badgeAlreadyRendered = false

    return (
        <Fragment>
            {todayEvents.map((event, i) => {
                const height =
                    differenceInMinutes(event.end, event.start) * minuteHeight
                const minutesFromTop = differenceInMinutes(
                    event.start,
                    set(today, {
                        hours: startHour,
                        minutes: 0,
                        seconds: 0
                    })
                )
                const topSpace = minutesFromTop * minuteHeight //+ headerHeight;
                /**
                 * Add border height since grid has a 1px border
                 */
                const slotsFromTop = minutesFromTop / step

                const borderFactor = slotsFromTop + BORDER_HEIGHT
                const top = topSpace + borderFactor

                let crossingEvents = traversCrossingEvents(todayEvents, event)
                let indexOfCurrent = crossingEvents.indexOf(event)
                let badge = undefined

                if (columnWidth) {
                    if (columnWidth > 160) {
                        overflowedEvents = crossingEvents.length - 2
                        crossingEvents = crossingEvents.slice(0, 2)
                        if (overflowedEvents > 0 && indexOfCurrent === 1) {
                            badge = overflowedEvents
                        }
                    } else {
                        overflowedEvents = crossingEvents.length - 1
                        crossingEvents = crossingEvents.slice(0, 1)
                        if (overflowedEvents > 0 && indexOfCurrent === 0) {
                            badge = overflowedEvents
                        }
                    }
                }

                const event_index = crossingEvents.findIndex(e => event.id === e.id)

                if (columnWidth && columnWidth > 160 && indexOfCurrent > 1) return <></>
                else if (columnWidth && columnWidth <= 160 && indexOfCurrent > 0) return <></>
                else {
                    return (
                        <>
                            <EventItem
                                key={event.id}
                                sx={{
                                    position: "absolute",
                                    zIndex: 1,
                                    height,
                                    top,
                                    width: crossingEvents.length
                                        ? `calc(${100 / (crossingEvents.length)}% - 5%)`
                                        : "95%", //Leave some space to click cell
                                    [direction === "rtl" ? "right" : "left"]:
                                        event_index > 0
                                            ? `calc(100%/${crossingEvents.length}*${event_index})`
                                            : "",
                                }}
                                event={event}/>
                            {badge !== undefined && !badgeAlreadyRendered &&
                                <div style={{width: "min-content", height: "min-content"}}>
                                    <Badge
                                        sx={{
                                            whiteSpace: "nowrap",
                                            cursor: "pointer",
                                            userSelect: "none",
                                            position: "absolute",
                                            left: 200,
                                            zIndex: 5,
                                            top
                                        }}
                                        color={"secondary"}
                                        badgeContent={"+" + badge + " událostí"}
                                        onClick={() => handleGotoDay(event.start)}
                                    >
                                        {badgeAlreadyRendered = !badgeAlreadyRendered}
                                        <div style={{position: "relative"}}/>
                                    </Badge>
                                </div>}
                        </>
                    )
                }
            })}
        </Fragment>
    )
})

    export default TodayEvents
