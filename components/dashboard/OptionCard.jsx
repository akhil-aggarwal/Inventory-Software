"use client"
import {Donut } from "lucide-react";
import React from "react";
import Link from "next/link";

export default  function OptionCard({optionData})
{   
    const {title, description, link, linkTitle, enabled, icon} = optionData;
    const Icon = icon;
    return(
        <div className="shadow-md bg-white flex flex-col justify-center items-center m-4 gap-2 p-6 py-12 rounded-lg">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <div className="my-2">
                        <Icon strokeWidth="0.75px" className="w-28 h-28 text-slate-500"/>
                    </div>
                    <p className="line-clamp-1">
                        {description}
                    </p>
                    {enabled?(
                        <Link href={link} className="rounded-sm bg-blue-600 px-3 py-2
                        inline-flex items-center space-x-2
                        text-white my-4">
                            <span>{linkTitle}</span>
                        </Link>
                    ):
                    (<button className="rounded-sm bg-blue-600 px-3 py-2
                                     inline-flex items-center space-x-2
                        text-white my-4">Enable</button>)
                    }
                    
                
                </div>
    )
}