import { addMinutes, getHours, getMinutes, isToday, set } from "date-fns"
import React, { memo } from "react"
import { GridCell } from "../../styles/styles"
import { EmptyCell } from "./EmptyCell"


export type RowProps = {
	rows: number[],
	columns: number[],
	isThereToday: boolean,
	todaysIndex: number
	step: number
	hourIndex: number
}

export const Row = memo((props: RowProps) => {
	let days: JSX.Element[] = []

	props.columns.map((column)=>{

		days.push((
			<GridCell today={column === props.todaysIndex}>
				<EmptyCell
					{...props}
					column={column}
					row={props.hourIndex}
				/>
			</GridCell>
		))
	})

	return <>{days}</>
})