import React, { memo } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { CellWithEvent } from "./CellWithEvent"
import { RowProps } from "./Row"

export type EventRowProps = RowProps & {
	step: number,
	startHour: number,
	hour: Date,
	daysList: Date[],
}

export const EventRow = memo((props: EventRowProps) => {
	const {events = []} = useCalendarProps()
	const days = props.daysList.map((day, index) =>
		<CellWithEvent
			column={index}
			hourIndex={props.hourIndex}
			day={day}
			events={events}
			step={props.step}
			startHour={props.startHour}
			hour={props.hour}
			key={day.toISOString()}/>
	)

	return <>{days}</>
})