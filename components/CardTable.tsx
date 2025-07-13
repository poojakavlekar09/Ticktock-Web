"use client";

import { useEffect, useState } from "react";
import { useCallback } from "react";
import Link from 'next/link'

export default function CardTable() {
    type Timesheet = {
        week: number;
        date: string;
        hours: number;
    };
    const [timesheets, setTimesheets] = useState<Timesheet[]>([]);

    useEffect(() => {
        fetch("/api/dashboard")
            .then((res) => res.json())
            .then((data) => setTimesheets(data));
    }, []);

    const getStatusDetails = useCallback((hours: number) => {
        if (hours === 40) {
            return { status: "COMPLETED", actionLabel: "View", statusClass: "bg-green-100 text-green-800" };
        }
        if (hours > 0) {
            return { status: "INCOMPLETE", actionLabel: "Update", statusClass: "bg-yellow-100 text-yellow-800" };
        }
        return { status: "MISSING", actionLabel: "Create", statusClass: "bg-pink-100 text-pink-800" };
    }, []);

    if (!timesheets.length) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center text-gray-500 text-sm">Loading timesheets...</div>
            </div>
        );
    }
    return (
        <div className="bg-white rounded-lg shadow-sm p-6 w-full max-w-7xl">
            <h2 className="text-xl font-semibold mb-4">Your Timesheets</h2>
            <div className="overflow-x-auto">
                <div className="border border-gray-200 shadow-sm rounded-lg overflow-hidden">
                    <table className="min-w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-4 py-3 w-[120px]">WEEK #</th>
                                <th className="px-4 py-3">DATE</th>
                                <th className="px-4 py-3">STATUS</th>
                                <th className="px-4 py-3">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {timesheets.map((ts) => {
                                const statusDetails = getStatusDetails(ts.hours);
                                return (
                                    <tr key={ts.week} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 bg-gray-50 w-[120px]">{ts.week}</td>
                                        <td className="px-4 py-3">{ts.date}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusDetails?.statusClass}`}
                                            >
                                                {statusDetails?.status}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Link href={`/${statusDetails?.actionLabel.toLowerCase()}/${ts.week}`} className="text-blue-500 font-medium text-sm">
                                                {statusDetails?.actionLabel}
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}