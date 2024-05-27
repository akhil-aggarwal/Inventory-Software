import HomeNavbar from "@/components/dashboard/HomeNavbar";
import { Divide } from "lucide-react";
import React from "react";

export default function Layout({children})
{
    return(
        <div>
            <HomeNavbar/>
            {children}
        </div>
    );
}