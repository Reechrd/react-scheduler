import {CalendarEvent} from "../../types";
import {addMinutes, differenceInMinutes, isEqual} from "date-fns";
import { useCallback } from "react";
import { alpha, Theme } from "@mui/material";

export const onDragOver = (e: React.DragEvent<HTMLButtonElement>, theme: Theme)=> {
    e.currentTarget.style.backgroundColor = alpha(theme.palette.secondary.main, 0.3)
    e.preventDefault()
}

export const onDragEnter = (e: React.DragEvent<HTMLButtonElement>, theme: Theme) => {
    e.currentTarget.style.backgroundColor = alpha(theme.palette.secondary.main, 0.3)
}

export const onDragLeave = (e: React.DragEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = ""
}


export const onDrop =(
    eventId: string,
    startTime: Date,
    onEventDrop?: (
        droppedOn: Date,
        updatedEvent: CalendarEvent,
        originalEvent: CalendarEvent
    ) => Promise<CalendarEvent | void>,
    events?: CalendarEvent[]) => {

    if (!events) {
        return
    }
    // Get dropped event
    const droppedEvent = events.find((e) => {
        if (typeof e.id === "number") {
            return e.id === +eventId
        }
        return e.id === eventId
    }) as CalendarEvent

    // Omit if dropped on same time slot for non multiple events
    if (isEqual(droppedEvent.start, startTime)) {
        return
    }

    // Update event time according to original duration & update resources/owners
    const diff = differenceInMinutes(droppedEvent.end, droppedEvent.start)
    const updatedEvent: CalendarEvent = {
        ...droppedEvent,
        start: startTime,
        end: addMinutes(startTime, diff),
    }

    onEventDrop?.(startTime, updatedEvent, droppedEvent)
}