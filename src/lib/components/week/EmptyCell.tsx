import React, { memo } from "react"
import {Cell} from "./Cell";

export type WeekCellProps = {
	column: number,
	row: number
}

export const EmptyCell = memo((props: WeekCellProps) => {
	return <Cell
		column={props.column}
		row={props.row}
		onCellClick={()=>{}} //TODO - je třeba tohle přesunout víš a posílat eventy podle ID (column:row)
	/>
})