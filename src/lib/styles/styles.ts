import {alpha, Box} from "@mui/material"
import {styled} from "@mui/material/styles"
import {useCalendarProps} from "../hooks/useCalendarProps";
import {format} from "date-fns";

export const TableGrid = styled(Box)<{ days: number; indent?: string }>(
    ({days, indent = "1", theme}) => ({
        position: "relative",
        display: "grid",
        height: '100%',
        gridTemplateRows: '0.3fr',
        gridAutoRows: '1fr',
        gridTemplateColumns:
            +indent > 0 ? `10% repeat(${days}, 1fr)` : `repeat(${days}, 1fr)`,
        [theme.breakpoints.down("sm")]: {
            gridTemplateColumns: +indent > 0 ? `30px repeat(${days}, 1fr)` : "",
        },
        "&:first-of-type": {
            borderStyle: "solid",
            borderColor: theme.palette.grey["200"],
            borderWidth: "0 1px 1px 0",
        },
    })
)

export const GridCell = styled(Box, {
    shouldForwardProp: prop => prop !== 'today'
})<{ today?: boolean, day?: Date }>(({theme, today = false, day}) => {

    const {workingHoursEnd, workingHoursStart} = useCalendarProps()

    let value = 0
    let color = theme.palette.secondary.light


    if (day) {
        const noWork = (format(day, "i") === "6" || format(day, "i") === "7") || !((workingHoursEnd ?? 17) >= parseInt(format(day, "H")) && parseInt(format(day, "H")) >= (workingHoursStart ?? 6))
        if (today && noWork) value = 0.5
        else if (noWork) {
            color = theme.palette.grey[200]
            value = 0.6
        } else if (today && !noWork) value = 0.6
    }

    let bgColor = alpha(color, value)

    return ({
        position: "relative",
        borderColor: theme.palette.grey["200"],
        borderWidth: "1px 0px 0px 1px",
        borderStyle: "solid",
        background: bgColor,
        "& > button": {
            width: "100%",
            height: "100%",
            borderRadius: 0,
            cursor: "pointer",
            "&:hover": {
                background: alpha(theme.palette.primary.main, 0.1),
            },
        },
        "& .rs__hover__op": {
            cursor: "pointer",
            "&:hover": {
                opacity: 0.7,
                textDecoration: "underline",
            },
        },
    })
})

export const WeekGridCell = styled(Box, {
    shouldForwardProp: prop => prop !== 'today'
})<{ today?: boolean, weekend: boolean, hour: number }>(({theme, today = false, weekend = false, hour = 0}) => {
    const {workingHoursEnd, workingHoursStart} = useCalendarProps()

    let value = 0
    let color = theme.palette.secondary.light

    const noWork = weekend || !((workingHoursEnd ?? 17) >= hour && hour >= (workingHoursStart ?? 6))
    if (today && noWork) value = 0.5
    else if (noWork) {
        color = theme.palette.grey[200]
        value = 0.6
    } else if (today && !noWork) value = 0.6

    let bgColor = alpha(color, value)

    return ({
        position: "relative",
        borderColor: theme.palette.grey["200"],
        borderWidth: "1px 0px 0px 1px",
        borderStyle: "solid",
        background: bgColor,
        "& > button": {
            width: "100%",
            height: "100%",
            borderRadius: 0,
            cursor: "pointer",
            "&:hover": {
                background: alpha(theme.palette.primary.main, 0.1),
            },
        },
        "& .rs__hover__op": {
            cursor: "pointer",
            "&:hover": {
                opacity: 0.7,
                textDecoration: "underline",
            },
        },
    })
})

export const GridHeaderCell = styled(GridCell, {
    shouldForwardProp: prop => prop !== 'today'
})<{ today?: boolean }>(({theme, today = false}) => ({
    padding: "2px 5px",
    ...(!today && {
        background: alpha(theme.palette.secondary.light, 0.6),
        '& .MuiTypography-root': {
            color: theme.palette.getContrastText(alpha(theme.palette.secondary.light, 0.6))
        }
    }),
    ...(today && {
        background: theme.palette.secondary.main,
        '& .MuiTypography-root': {
            color: theme.palette.getContrastText(theme.palette.secondary.main)
        }
    })
}))

export const GridTimeCell = styled(GridCell)(({theme}) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
        writingMode: "vertical-rl",
    },
    padding: "2px 5px",
}))

export const PopperInner = styled(Box)(() => ({
    minWidth: 400,
    maxWidth: "95%",
    "& > div": {
        padding: "5px 10px",
        "& .rs__popper_actions": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
    },
}))
