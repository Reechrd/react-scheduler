import { CalendarEvent } from "../lib/types"

export const EVENTS: CalendarEvent[] = [
	// {
	//   event_id: 1,
	//   title: "Event 1",
	//   start: new Date("2021 5 2 10:30"),
	//   end: new Date("2021 5 2 12:30"),
	//   admin_id: [1, 2, 3, 4],
	//   disabled: true,
	// },
	// {
	//   event_id: 2,
	//   title: "Event 2",
	//   start: new Date("2021 5 4 10:00"),
	//   end: new Date("2021 5 4 11:00"),
	//   admin_id: 2,
	// },
	// {
	//   event_id: 3,
	//   title: "Event 3",
	//   start: new Date("2021 4 27 09:00"),
	//   end: new Date("2021 4 28 10:00"),
	//   admin_id: 1,
	// },
	// {
	//   event_id: 4,
	//   title: "Event 4",
	//   start: new Date("2021 5 4 9:00"),
	//   end: new Date("2021 5 4 10:36"),
	//   admin_id: 2,
	// },
	// {
	//   event_id: 5,
	//   title: "Event 5",
	//   start: new Date("2021 5 1 10:00"),
	//   end: new Date("2021 5 18 11:00"),
	//   admin_id: 2,
	// },
	// {
	//   event_id: 6,
	//   title: "Event 6",
	//   start: new Date("2021 5 2 12:00"),
	//   end: new Date("2021 5 2 13:00"),
	//   admin_id: 2,
	// },
	{
		id: 10,
		title: "Multi-week",
		start: new Date("2022 1 20 09:00"),
		end: new Date("2022 2 1 09:20"),
	},
	{
		id: 11,
		title: "Testing event",
		start: new Date("2022 1 25 09:00"),
		end: new Date("2022 1 26 09:20"),
	},
	{
		id: 12,
		title: "2 day event",
		start: new Date("2022 1 24 09:00"),
		end: new Date("2022 1 25 09:20"),
	},
	{
		id: 7,
		title: "Multi-day",
		start: new Date("2022 1 25 09:00"),
		end: new Date("2022 1 28 09:20"),
		disabled: true
	},
	{
		id: 9,
		title: "Multi-day offset",
		start: new Date("2022 1 26 09:00"),
		end: new Date("2022 1 31 09:20"),
	}, {
		id: 'short',
		title: "Short",
		start: new Date("2023 2 18 09:00"),
		end: new Date("2023 2 18 10:20"),
	}, {
		id: 'test',
		title: "test",
		start: new Date("2023 2 19 09:00"),
		end: new Date("2023 2 19 10:20"),
	}, {
		id: 'test2',
		title: "87",
		start: new Date("2023 2 17 09:00"),
		end: new Date("2023 2 17 10:20"),
	}, {
		id: 'test3',
		title: "test54",
		start: new Date("2023 2 18 21:00"),
		end: new Date("2023 2 18 22:20"),
	},{
		id: 'test4',
		title: "test41",
		start: new Date("2023 2 18 13:00"),
		end: new Date("2023 2 18 14:20"),
	}, {
		id: 'test5',
		title: "testdfdsfdsfsd",
		start: new Date("2023 2 19 14:00"),
		end: new Date("2023 2 19 16:00"),
	}



	// {
	//   event_id: 10,
	//   title: "Event 9",
	//   start: new Date("2021 5 6  15:00"),
	//   end: new Date("2021 5 6 16:00"),
	//   admin_id: 2,
	// },
	// {
	//   event_id: 11,
	//   title: "Event 10",
	//   start: new Date("2021 5 6 14:00"),
	//   end: new Date("2021 5 6 15:00"),
	//   admin_id: 2,
	// },
]
