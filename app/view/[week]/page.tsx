"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const labelClass = "w-28 text-gray-600 font-medium shrink-0 align-top";
const taskCardClass = "flex justify-between items-center w-full border border-gray-200 rounded-md px-4 py-2";

const DayRow = ({ rowKey, date, task }: { rowKey: number; date: string; task: { name: string; project: string; hours: number } }) => (
    <div className="flex items-start bg-white text-sm" key={rowKey}>
        <div className={labelClass}>{rowKey === 0 ? date : ""}</div>
        <div className={taskCardClass}>
            <span className="text-gray-800">{task?.name}</span>
            <div className="flex items-center space-x-4">
                <span className="text-gray-500">{task?.hours} hrs</span>
                <span className="bg-[#E1EFFE] text-[#1E429F] font-medium cursor-pointer px-2 rounded">{task?.project}</span>
                <Image className="cursor-pointer color-gray" src="/images/icons/ellipsisIcon.svg" alt="view more" width={10} height={1} />
            </div>
        </div>
    </div>
);

const AddTaskRow = () => (
    <div className="flex items-center pl-3 bg-white text-sm">
        <div className="w-28" />
        <button className="w-full border border-dashed text-sm py-2 rounded-md hover:bg-blue-50 hover:border-blue-400 hover:text-blue-600 text-gray-500 border-gray-400">
            + Add new task
        </button>
    </div>
);

const DaySection = ({ date, tasks }: { date: string; tasks: { name: string; project: string; hours: number }[] }) => (
    <div className="mb-6 space-y-2" key={date}>
        {tasks.map((task, idx) => (
            <DayRow key={idx} rowKey={idx} date={date} task={task} />
        ))}
        <AddTaskRow />
    </div>
);

const ListView = () => {
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

    const [timesheet, setTimesheet] = useState<Timesheet[]>([]);
    const params = useParams();
    const week = params?.week;

    useEffect(() => {
        const fetchTimesheetDetails = async () => {
            const res = await fetch(`/api/timesheet/${week}`);
            const data = await res.json();
            setTimesheet(data);
        };

        fetchTimesheetDetails();
    }, []);

    return (
        <>
            <Header />

            {/* Content */}
            <main className="min-h-screen bg-gray-50 px-4 py-6 flex flex-col items-center">
                <div className="bg-white w-full max-w-7xl rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-semibold">This week’s timesheet</h2>
                        <div className="relative group flex flex-col items-end text-sm text-gray-500">
                            <span className="cursor-default group-hover:text-gray-700 transition">100%</span>
                            <div className="relative h-1 w-44 bg-gray-200 rounded-full overflow-hidden">
                                <div className="absolute left-0 top-0 h-full bg-orange-500 transition-all duration-300 w-1/2"></div>
                            </div>
                            <div className="absolute -top-9 right-0 hidden group-hover:block bg-white text-gray-900 text-xs rounded-md px-3 py-1 shadow-lg border border-gray-200 whitespace-nowrap">
                                20/40hr
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-6">{timesheet[0]?.period}</p>
                    {timesheet[0]?.weekDays?.map((day) => (
                        <DaySection key={day.date} date={day.date} tasks={day.tasks} />
                    ))}
                </div>

                <Footer />
            </main>
        </>
    );
};

export default ListView;
