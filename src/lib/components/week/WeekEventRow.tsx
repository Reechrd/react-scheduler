import React, { memo } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { WeekCellWithEvent } from "./WeekCellWithEvent"

export type EventRowProps =  {
	startHour: number,
	hour: Date,
	daysList: Date[],
	rows: number[],
	columns: number[],
	step: number
	row: number
}

export const WeekEventRow = memo((props: EventRowProps) => {
	const {events = []} = useCalendarProps()
	const days = props.daysList.map((day, index) =>
		<WeekCellWithEvent
			column={index}
			hourIndex={props.row}
			day={day}
			events={events}
			step={props.step}
			startHour={props.startHour}
			hour={props.hour}
			key={day.toISOString()}/>
	)

	return <>{days}</>
})