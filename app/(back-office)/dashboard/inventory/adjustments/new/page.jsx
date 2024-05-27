import AdjustmentForm from "@/components/dashboard/AdjustmentForm";
import { getData } from "@/lib/getData";
import React from "react";


export  default async function NewAdjustments()
{   
    const itemsData = getData("items");
    const warehousesData = getData("warehouse");
    const supplierData = getData("suppliers");

    const [items, warehouses, suppliers] = await Promise.all([itemsData, warehousesData, supplierData]);
    return(
        <AdjustmentForm items={items} warehouses={warehouses} suppliers={suppliers}/>
    )
}