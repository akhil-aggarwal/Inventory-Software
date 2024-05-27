"use client"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import { Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { generateInitials } from "@/lib/generateInitials";
import { split } from "postcss/lib/list";
  

export default function Navbar()
{
    const {data: session, status}  = useSession(); 
    const [show,setShow] = useState(false);
    //const pathname = usePathname();

    // if(pathname.startsWith("/inventory/") && pathname !== "/inventory/new")
    //     {
    //         return null;
    //     }
    
    function getInitials(fullname)
    {
        const words = fullname.split(" ");
        let initials = " ";
        for(let i=0; i<words.length; i++)
            {
                initials += words[i][0];
            }
            initials = initials.toUpperCase();

            return initials;
    }


    const initials = getInitials(session?.user?.name ?? "Bansal Snax") ;

    console.log(initials);

    return(
        <div>
            <nav className="bg-blue-600 text-white border-gray-200 dark:bg-gray-700 shadow-2xl">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                <Image src="https://flowbite.com/docs/images/logo.svg" width="50" height="50" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Inventory</span>
            </a>
            <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {status === "authenticated" ? (
                <div className="flex gap-4">
                
                <div className="flex text-sm self-center">
                        Anoop Aggarwal
                </div>

                <Link href="/dashboard/home/overview" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 text-center" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                <span className="sr-only">Profile</span>
                {session.user?.image?(
                            <img 
                            src={session.user?.image}
                            alt="user-img" 
                            width={96} 
                            height={96} 
                            className="w-10 h-10 rounded-full border border-slate-800"/>
                        ): (
                            <div className="w-10 h-10 rounded-full border border-slate-800 bg-white text-slate-900 items-center pt-2">
                               <span className="self-center"> {initials} </span>
                            </div>
                        )}
                </Link>

                <button onClick={()=> signOut()} className="p-1 rounded-sm text-blue-600 px-3
                flex items-center space-x-2
                bg-white mx-5">
                <span className="font-semibold">Logout</span>
                </button>

                

                </div>
            ) :
            (   <div className="flex space-x-1 h-10">
                
               <Link href="/login" className="p-1 rounded-sm text-blue-600 px-3
                flex items-center space-x-2
                bg-white mx-5">
                <span className="font-semibold" onClick={()=> signIn()}>Login</span>
                </Link>

                <Link href="/register" className="p-1 rounded-sm text-blue-600 px-3
                flex items-center space-x-2
                bg-white mx-5">
                <span className="font-semibold"> Register </span>
                </Link>

                </div>
            )
            }   


                {/**Dropdown */}
                
                <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                    <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                    <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Earnings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
                    </li>
                    </ul>
                </div>
                <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>

            

            </div>
            
            </div>
            </nav>

        </div>
    )
}