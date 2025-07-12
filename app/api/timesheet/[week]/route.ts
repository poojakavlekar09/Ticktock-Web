import { NextRequest, NextResponse } from "next/server";

type Timesheet = {
    period: string;
    weekDays: {
        date: string;
        tasks: {
            name: string;
            project: string;
            hours: number;
        }[];
    }[];
};

const mockTimesheetDetails: Record<string, Timesheet[]> = {
    1: [
        {
            period: "1 - 5 January, 2025",
            weekDays: [
                {
                    date: "Jan 01",
                    tasks: [
                        { name: "Homepage Development", project: "ticktock", hours: 4 },
                        { name: "Fix bugs", project: "ticktock", hours: 2 },
                    ],
                },
                {
                    date: "Jan 02",
                    tasks: [
                        { name: "Login Page", project: "ticktock", hours: 6 },
                        { name: "API Integration", project: "ticktock", hours: 6 },
                    ],
                },
                {
                    date: "Jan 03",
                    tasks: [
                        { name: "Login Page", project: "ticktock", hours: 10 },
                    ],
                },
                {
                    date: "Jan 04",
                    tasks: [
                        { name: "Login Page", project: "ticktock", hours: 20 },
                    ],
                },
                {
                    date: "Jan 05",
                    tasks: [
                        { name: "Login Page", project: "ticktock", hours: 7 },
                        { name: "API Integration", project: "ticktock", hours: 6 },
                    ],
                },
            ],
        },
    ],
    2: [
        {
            period: "8 - 12 January, 2025",
            weekDays: [
                {
                    date: "Jan 08",
                    tasks: [
                        { name: "API Integration", project: "Admin Portal", hours: 5 },
                    ],
                },
                {
                    date: "Jan 09",
                    tasks: [
                        { name: "API Integration", project: "Admin Portal", hours: 5 },
                    ],
                },
                {
                    date: "Jan 10",
                    tasks: [
                        { name: "API Integration", project: "Admin Portal", hours: 5 },
                    ],
                },
                {
                    date: "Jan 11",
                    tasks: [
                        { name: "API Integration", project: "Admin Portal", hours: 5 },
                    ],
                },
                {
                    date: "Jan 12",
                    tasks: [
                        { name: "Integration Testing", project: "Admin Portal", hours: 5 },
                        { name: "Login Page", project: "ticktock", hours: 7 },
                    ],
                },
            ],
        },
    ],
    3: [
        {
            period: "15 - 19 January, 2025",
            weekDays: [
                {
                    date: "Jan 15",
                    tasks: [
                        { name: "API Integration", project: "Admin Portal", hours: 5 },
                    ],
                },
                {
                    date: "Jan 16",
                    tasks: [
                        { name: "API Integration", project: "ticktock", hours: 5 },
                    ],
                },
                {
                    date: "Jan 17",
                    tasks: [
                        { name: "API Integration", project: "ticktock", hours: 5 },
                    ],
                },
                {
                    date: "Jan 18",
                    tasks: [
                        { name: "API Integration", project: "ticktock", hours: 5 },
                        { name: "Login Page", project: "ticktock", hours: 7 },
                    ],
                },
                {
                    date: "Jan 19",
                    tasks: [
                        { name: "Integration Testing", project: "ticktock", hours: 5 },
                        { name: "Login Page", project: "ticktock", hours: 7 },
                    ],
                },
            ],
        },
    ],
    4: [
        {
            period: "22 - 26 January, 2025",
            weekDays: [
                {
                    date: "Jan 22",
                    tasks: [
                        { name: "API Integration", project: "Admin Portal", hours: 5 },
                    ],
                },
                {
                    date: "Jan 23",
                    tasks: [
                        { name: "Login Page", project: "Admin Portal", hours: 7 },
                        { name: "API Integration", project: "Admin Portal", hours: 5 },
                    ],
                },
                {
                    date: "Jan 24",
                    tasks: [
                        { name: "API Integration", project: "Admin Portal", hours: 5 },
                    ],
                },
                {
                    date: "Jan 25",
                    tasks: [
                        { name: "API Integration", project: "Admin Portal", hours: 5 },
                        { name: "Login Page", project: "Admin Portal", hours: 7 },
                    ],
                },
                {
                    date: "Jan 26",
                    tasks: [
                        { name: "Integration Testing", project: "Admin Portal", hours: 5 },
                        { name: "Login Page", project: "Admin Portal", hours: 7 },
                    ],
                },
            ],
        },
    ],
};

export async function GET(req: NextRequest, { params }: { params: { week: string } }) {
const week = (await params)?.week;
  const data = mockTimesheetDetails[week];

  if (!data) {
    return NextResponse.json({ error: "Week not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}