import React from "react";
import { getData } from "@/lib/getData";
import NewWarehouse from "../../new/page";

export default async function Updates({params:{id}})
{   
    const data = await getData(`warehouse/${id}`);
    console.log(data);
    return(
        <div>
            <NewWarehouse initialData = {data} isUpdate={true}/>
        </div>
    )
}