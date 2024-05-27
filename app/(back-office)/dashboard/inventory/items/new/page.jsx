import React from "react";
import { getData } from "@/lib/getData";
import NewItem from "@/components/dashboard/NewItem";

export default async function Page({params:{id}})
{   
    const data = {};
    return(
        <div>
            <NewItem initialData = {data} isUpdate={false}/>
        </div>
    )
}