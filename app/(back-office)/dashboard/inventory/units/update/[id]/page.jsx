import React from "react";
import NewBrand from "../../new/page";
import { getData } from "@/lib/getData";
import NewUnit from "../../new/page";

export default async function Updates({params:{id}})
{   
    const data = await getData(`units/${id}`);
    console.log(data);
    return(
        <div>
            <NewUnit initialData = {data} isUpdate={true}/>
        </div>
    )
}