import { alpha, Button, useTheme } from "@mui/material"
import React, { ForwardedRef, forwardRef } from "react"
import { useAppState } from "../../hooks/useAppState"

interface CellProps {
	start: Date;
	end: Date;
	resourceKey?: string;
	resourceVal?: string | number;
	children?: JSX.Element;
}

const Cell = forwardRef(({
	start,
	end,
	resourceKey,
	resourceVal,
	children,
}: CellProps, ref: ForwardedRef<HTMLButtonElement>) => {
	const {triggerDialog, onDrop} = useAppState()
	const theme = useTheme()

	return (
		<Button
			ref={ref}
			fullWidth
			onClick={() => {
				triggerDialog(true, {
					start,
					end,
					[resourceKey || ""]: resourceVal,
				})
			}}
			onDragOver={(e) => {
				e.currentTarget.style.backgroundColor = alpha(
					theme.palette.secondary.main,
					0.3
				)
				e.preventDefault()
			}}
			onDragEnter={(e) => {
				e.currentTarget.style.backgroundColor = alpha(
					theme.palette.secondary.main,
					0.3
				)
			}}
			onDragLeave={(e) => {
				e.currentTarget.style.backgroundColor = ""
			}}
			onDrop={(e) => {
				e.currentTarget.style.backgroundColor = ""
				const eventId = e.dataTransfer.getData("text")
				onDrop(eventId, start, resourceKey, resourceVal)
			}}
		>
			{children}
		</Button>
	)
})

export { Cell }
