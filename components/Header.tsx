"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
    const { data: session } = useSession();

    return (
        <header className="bg-white px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-8">
                <h1 className="text-xl font-bold">ticktock</h1>
                <span className="text-gray-700 font-medium text-sm">Timesheets</span>
            </div>
            <div className="flex text-sm space-x-2">
                <span className="text-gray-600">{session?.user.name}</span>
                <Image className="cursor-pointer color-gray" src="/images/icons/dropdownIcon.svg" alt="view more" width={10} height={1} />
            </div>
        </header>
    );
}