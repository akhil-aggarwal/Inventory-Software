
import React from "react";
import DataTable from "./DataTable";

export default function CurrentStock({items,title})
{   
    const columns = ["imageUrl","title", "quantity"];  
    return(
        <div className="p-8">
            <h2 className="text-xl mb-2">{title}</h2>
            <DataTable data={items} columns={columns} resourceTitle="items" />
        </div>
    );
}