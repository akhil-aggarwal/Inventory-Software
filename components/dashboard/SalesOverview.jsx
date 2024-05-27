import { Check, CheckCircle2 } from "lucide-react";
import React from "react";
import Link from "next/link";
import SalesActivityCard from "./SalesActivityCard";
import InventorySummaryCard from "./InventorySummaryCard";
import { getData } from "@/lib/getData";

export default async function SalesOverview()
{   
    const categoriesData = getData('categories');
    const itemsData = getData('items');
    const warehousesData = getData('warehouse');
    const suppliersData = getData('suppliers');

    //Parallel Fetching rather than Sequential Fetching / Waterfall method where every data has to await for the fetching of previous data
    const [categories, items, warehouses, suppliers] = 
    await Promise.all([
        categoriesData, 
        itemsData,
        warehousesData,
        suppliersData])

    const InventorySummary = warehouses.map((item,i)=> {
        return {
            title : item.title,
            number : item.stockQty ,
        }
    })

    const SalesActivity = [
        {
            title : "Categories",
            number : categories.length,
            unit : "Nos",
            href : "/dashboard/inventory/categories",
            color: "text-blue-400",
        },

        {
            title : "Items",
            number : items.length,
            unit : "Nos",
            href : "/dashboard/inventory/items",
            color: "text-red-400",
        },

        {
            title : "Warehouses",
            number : warehouses.length,
            unit : "Nos",
            href : "/dashboard/inventory/warehouse",
            color: "text-green-400",
        },

        {
            title : "Suppliers",
            number : suppliers.length,
            unit : "Nos",
            href : "/dashboard/inventory/suppliers",
            color: "text-yellow-400",
        },
    ];

    // const InventorySummary = [
    //     {
    //             title : "Quantity in Hand",
    //             number : 10,
    //     },

    //     {
    //         title : "Quantity to be recieved",
    //         number : 0,
    // },
    // ];
    return(
        <div className="bg-blue-50 border-b border-slate-300 grid grid-cols-12 gap-4 ">
            {/**SALES ACTIVITY */}
            <div className="col-span-full lg:col-span-8 border-r border-slate-200 p-8 py-16 md:py-8 lg:py-8">
                <h2 className="mb-6 text-xl">System Statistics</h2>
                <div className=" pr-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/**Card */}
                    {
                        SalesActivity.map((item, i)=> {
                            return(
                                <SalesActivityCard item={item} key={i}/>
                            )
                        })
                    }
                    
                </div>
            </div>
            {/**INVENTORY SUMMARY */}
            <div className="col-span-full lg:col-span-4 p-8">
            <h2 className="mb-6 text-xl">Inventory Summary</h2>
            <div className="">
                {
                    InventorySummary.map((item,i) =>
                
                    {
                        return(
                            <InventorySummaryCard item={item} key={i}/>
                        )
                    }
                )
                }

            </div>
            </div>
        </div>
    )
}