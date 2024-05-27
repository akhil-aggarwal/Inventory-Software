"use client"
import { History, Plus, Users2, Bell, Settings, ChevronDown, LayoutGrid, AlignJustify } from "lucide-react";
import React, { useState } from "react";
import SearchInput from "./searchInput";
import { signOut, useSession } from "next-auth/react";
import { generateInitials } from "@/lib/generateInitials";
import Login from "@/app/login/page";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  

export default function Header({setShowSidebar})
{   
    const {data:session, status} = useSession();

    const username =session?.user?.name.split(' ')[0]?? " ";
    const initals = generateInitials(session?.user?.name)
    return(
        <div className="bg-slate-100 h-12 flex items-center justify-between px-8 border-b border-slate-200">
            <button className="lg:hidden" onClick={()=> setShowSidebar(true)}>
                <AlignJustify className="w-6 h-6"/>
            </button>
            <div className="flex gap-3 hidden lg:flex">
            {/* Recent Updates*/}
            
            <button className="hidden sm:block">
                <History className="w-6 h-6"/>
            </button>
            {/* Search */}
            <SearchInput/>
            </div>
            <div className="flex items-center gap-3 hidden lg:flex">
                {/*Plus Icons */}
                <div className="pr-2 border-r border-gray-300 ">
                    <button className="p-1 rounded-lg bg-blue-600">
                        <Plus className="text-slate-50 w-4 h-4"/>
                    </button>
                </div>
                <div className="flex pr-2 border-r border-gray-300 space-x-2">
                    <button className="p-1 rounded-lg hover:bg-slate-200">
                        <Users2 className="text-slate-900 w-4 h-4"/>
                    </button>
                    <button className="p-1 rounded-lg hover:bg-slate-200">
                        <Bell className="text-slate-900 w-4 h-4"/>
                    </button>
                    <button className="p-1 rounded-lg hover:bg-slate-200">
                        <Settings className="text-slate-900 w-4 h-4"/>
                    </button>
                    
                </div>
                
                {/** */}
                <div className="flex gap-3">
                    
                <DropdownMenu>
                <DropdownMenuTrigger>
                    
                    <button className="flex items-center"><span>{username}</span>
                    <ChevronDown className="w-4 h-4"/>
                    </button>

                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <button onClick={()=> signOut()}>
                            Logout
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
                </DropdownMenu>


                    
                    <button>
                        {session.user?.image?(
                            <img 
                            src={session.user?.image}
                            alt="user-img" 
                            width={96} 
                            height={96} 
                            className="w-8 h-8 rounded-full border border-slate-800"/>
                        ): (
                            <div className="w-8 h-8 rounded-full border border-slate-800 bg-white items-center justify-center">
                                {initals}
                            </div>
                        )}
                    </button>
                </div>
                {/** */}
                <button>
                    <LayoutGrid className="w-6 h-6 text-slate-900"/>
                </button>
            </div>
            <button className="lg:hidden">
                <img src="/img.jpg" alt="user-img" width={96} height={96} className="w-8 h-8 rounded-full border border-slate-800"/>
            </button>
        </div>
    );
}