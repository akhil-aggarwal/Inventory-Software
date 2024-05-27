import CurrentStock from "@/components/dashboard/CurrentStock";
import SalesOverview from "@/components/dashboard/SalesOverview";
import { getData } from "@/lib/getData";
import React from "react";

export default async function Dashboard()
{   const items = await getData("items");
    const warehouses = await getData("warehouse");
    return(
        <div>
            <SalesOverview/>
            <CurrentStock items={items}  title="Current Stock"/>
            {
                warehouses.map((warehouse,i)=>{
                    return(
                        <CurrentStock key={i} items={warehouse.items} title={`Stock at ${warehouse.title}`}/>
                    )
                })
            }
        </div>
    );
}