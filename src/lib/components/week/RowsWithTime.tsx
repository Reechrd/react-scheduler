import { Typography } from "@mui/material"
import { format } from "date-fns"
import React, {Fragment, memo, useEffect, useMemo} from "react"
import { GridTimeCell } from "../../styles/styles"
import { EventRow, EventRowProps } from "./EventRow"
import { Row } from "./Row"
import {useCalendarProps} from "../../hooks/useCalendarProps";

type Props = Omit<EventRowProps & {
	hours: Date[],
}, 'hour' | 'hourIndex'>

export const RowsWithTime = memo((props: Props) => {
	const {locale} = useCalendarProps()

	const Rows = useMemo(()=>props.rows.map((row, index)=><Row
			hourIndex={index}
			step={props.step}
			rows={props.rows}
			columns={props.columns}
			todaysIndex={props.todaysIndex}
			isThereToday={props.isThereToday}
		/>
	),[props.todaysIndex, props.isThereToday])

	useEffect(()=>{
		console.log("jo updatuje se přesně to co myslíš")
	},[Rows])

	let hours: JSX.Element[] = []
	for ( let hourIndex = 0; hourIndex < props.hours.length; hourIndex++ ) {
		// using classic for loop for performance
		const hour = props.hours[hourIndex]
		hours.push((
			<Fragment key={hour.toISOString()}>
				{/* Time cell */}
				<GridTimeCell>
					<Typography variant="caption">
						{format(hour, "hh:mm a", {locale: locale})}
					</Typography>
				</GridTimeCell>

				{hourIndex === 0 ?
					<EventRow
						daysList={props.daysList}
						hour={hour}
						startHour={props.startHour}
						step={props.step}
						rows={props.rows}
						columns={props.columns}
						isThereToday={props.isThereToday}
						todaysIndex={props.todaysIndex}
						hourIndex={hourIndex}
					/>
					:
					Rows[hourIndex]
				}
			</Fragment>
		))
	}

	return <>{hours}</>
})