import { NextResponse } from "next/server";

export async function GET() {
    const timesheets = [
      { week: 1, date: "1 - 5 January, 2025", hours: 40 },
      { week: 2, date: "8 - 12 January, 2025", hours: 40 },
      { week: 3, date: "15 - 19 January, 2025", hours: 24 },
      { week: 4, date: "22 - 26 January, 2025", hours: 40 },
      { week: 5, date: "28 January – 1 February, 2025", hours: 0 },
    ];
  
    return NextResponse.json(timesheets);
  }