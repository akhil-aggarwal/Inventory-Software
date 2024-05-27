
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function Hero()
{   

    return(
        <div className="h-screen bg-gradient-to-b from-blue-600 flex flex-col
        py-8 md:py-16 px-4 
        md:px-16 text-slate-50 items-center text-center gap-6">

            <div className="flex flex-col space-y-8 items-center max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold ">
                    Bansal Roasted Snacks Inventory Panel
                                   </h2>
                <p className="text-base md:text-xl">
                    Create Items, Manage Warehouses at one Platform. Build and Designed for Food Industries.
                </p>

                <Link href="/dashboard/home/overview" className="bg-rose-600 hover:bg-rose-700 focus:ring-rose-300 px-6 py-3 rounded-xl">
                View Dashboard
                </Link>
            </div>

        </div>
    )
}