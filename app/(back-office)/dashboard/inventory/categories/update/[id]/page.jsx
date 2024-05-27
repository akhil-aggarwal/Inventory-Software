import React from "react";
import { getData } from "@/lib/getData";
import NewCategory from "../../new/page";

export default async function Updates({params:{id}})
{   
    const data = await getData(`categories/${id}`);
    console.log(data);
    return(
        <div>
            <NewCategory initialData = {data} isUpdate={true}/>
        </div>
    )
}