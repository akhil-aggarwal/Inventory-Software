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
  

export default function Footer()
{

    return(
        <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
            <div className="mx-auto max-w-screen-xl text-center">
                <a 
                href="/"
                className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    Inventory
                </a>
                <p className="my-6 text-gray-500 dark:text-gray-400">
                Create Items, Manage Warehouses at one Platform. Build and Designed for Food Industries.
                </p>
                <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
                    <li>
                        <a href="/" className="mr-4 hover:underline md:mr-6">
                            About
                        </a>
                    </li>

                    <li>
                        <a href="/" className="mr-4 hover:underline md:mr-6">
                            Blogs
                        </a>
                    </li>

                    
                    <li>
                        <a href="/" className="mr-4 hover:underline md:mr-6">
                            Updates
                        </a>
                    </li>

                    
                    <li>
                        <a href="/" className="mr-4 hover:underline md:mr-6">
                            Contact
                        </a>
                    </li>

                    <li>
                        <a href="/" className="mr-4 hover:underline md:mr-6">
                            FAQ
                        </a>
                    </li>
                </ul>

                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                    2024-2025{" "}
                    <a href="/" className="hover:underline">Inventory</a>. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
}