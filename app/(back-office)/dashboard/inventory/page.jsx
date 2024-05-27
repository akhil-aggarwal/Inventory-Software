"use client"
import FixedHeader from "@/components/dashboard/FixedHeader";
import OptionCard from "@/components/dashboard/OptionCard";
import { Apple, Bean, ClipboardList, Donut, Factory, Nut, Popcorn, Settings, Shirt, Warehouse, Weight, Wheat } from "lucide-react";
import Link from "next/link";
import React from "react";

export default  function Inventory()
{
    const OptionCards = [


        {
            title : "Items",
            description : "Create new Items here..",
            link : "/dashboard/inventory/items/new",
            linkTitle: "New Items",
            enabled: true,
            icon: Nut   
        },

        {
            title : "Categories",
            description : "Create new Categories here..",
            link : "/dashboard/inventory/categories/new",
            linkTitle: "New Category",
            enabled: true,
            icon: Wheat
        },

        {
            title : "Brands",
            description : "Tweak your item price list for specific contacts or transactions",
            link : "/dashboard/inventory/brands/new",
            linkTitle: "New Brand",
            enabled: true,
            icon: Bean
        },

        {
            title : "Warehouse",
            description : "Tweak your item price list for specific contacts or transactions",
            link : "/dashboard/inventory/warehouse/new",
            linkTitle: "New Warehouse",
            enabled: true,
            icon: Warehouse
        },

        {
            title : "Units",
            description : "Tweak your item price list for specific contacts or transactions",
            link : "/dashboard/inventory/units/new",
            linkTitle: "New Units",
            enabled: true,
            icon: Weight
        },

        {
            title : "Suppliers",
            description : "Add/ Edit Suppliers here",
            link : "/dashboard/inventory/suppliers/new",
            linkTitle: "New Supplier",
            enabled: true,
            icon: Factory
        },

        {
            title : "Inventory Adjustments",
            description : "Tweak your inventory list for stock transfer or transactions",
            link : "/dashboard/inventory/adjustments/new",
            linkTitle: "New Adjustment",
            enabled: true,
            icon: Settings
        },
    ]
    return(
        <div>
            <FixedHeader title="All Items" newLink="/dashboard/inventory/items/new" />

            <div className="grid grid-col-1 lg:grid-cols-3 md:grid-cols-2 py-8 px-16 gap-2">
               {
                OptionCards.map((card,i)=>{
                        return(
                            <OptionCard optionData={card} key={i}/>
                        )
                }
            )
               }
            </div>
        </div>
    );
}