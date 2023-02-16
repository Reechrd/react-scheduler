import { Typography } from "@mui/material"
import { format } from "date-fns"
import React, { Fragment, memo } from "react"
import { useCalendarProps } from "../../hooks/useCalendarProps"
import { GridTimeCell } from "../../styles/styles"
import { EventRow, EventRowProps } from "./EventRow"
import { Row } from "./Row"

type Props = Omit<EventRowProps & {
	hours: Date[],
}, 'hour' | 'hourIndex'>

export const RowsWithTime = memo((props: Props) => {
	const {locale} = useCalendarProps()

	let hours: JSX.Element[] = []
	for ( let hourIndex = 0; hourIndex < props.hours.length; hourIndex++ ) {
		// using classic for loop for performance
		const hour = props.hours[hourIndex]
		hours.push((
			<Fragment key={hour.toISOString()}>
				{/* Time cell */}
				<GridTimeCell>
					<Typography variant="caption">
						{format(hour, "H:mm", {locale: locale})}
					</Typography>
				</GridTimeCell>

				{hourIndex === 0 ?
					<EventRow
						hour={hour}
						startHour={props.startHour}
						step={props.step}
						daysList={props.daysList}
					/>
					:
					<Row
						step={props.step}
						daysList={props.daysList}
						hour={hour}
					/>
				}
			</Fragment>
		))
	}

	return <>{hours}</>
})