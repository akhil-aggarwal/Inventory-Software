import React from "react";
import { getData } from "@/lib/getData";
import NewSupplier from "../../new/page";

export default async function Updates({params:{id}})
{   
    const data = await getData(`suppliers/${id}`);
    console.log(data);
    return(
        <div>
            <NewSupplier initialData = {data} isUpdate={true}/>
        </div>
    )
}