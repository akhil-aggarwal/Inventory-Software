"use client"
import { BaggageClaim, BarChart4, Cable, ChevronLeft, Home, Paperclip, PlusCircle, ReceiptRussianRuble, ShoppingBag, ShoppingBasket, ShoppingCart } from "lucide-react";
import React from "react";
import CollapsibleLink from "./CollapsibleLink";
import Link from "next/link";
import SidebarDropdownLink from "./SidebarDropdownLink";


  

export default function Sidebar({showSidebar, setShowSidebar})
{   
    const inventoryLinks = [
        {
            title:"All",
            href:"/dashboard/inventory",
        },
        {
            title:"Items",
            href:"/dashboard/inventory/items",
        },
        {
            title:"Categories",
            href:"/dashboard/inventory/categories",
        },
        {
            title:"Brands",
            href:"/dashboard/inventory/brands",
        },
        {
            title:"Units",
            href:"/dashboard/inventory/units",
        },
        {
            title:"Warehouse",
            href:"/dashboard/inventory/warehouse",
        },
        {
            title:"Supplier",
            href:"/dashboard/inventory/suppliers",
        },
        {
            title:"Inventory Adjustments",
            href:"/dashboard/inventory/adjustments",
        },
    ];

    const salesLinks = [
        {
            title:"Customers",
            href:"#",
        },
        {
            title:"Sales Orders",
            href:"#",
        },
        {
            title:"Packages",
            href:"#",
        },
        {
            title:"Shipments",
            href:"#",
        },
        {
            title:"Invoices",
            href:"#",
        },
        {
            title:"Sales Reciepts",
            href:"#",
        },
        {
            title:"Payments Recieved",
            href:"#",
        },
        {
            title:"Sales Returns",
            href:"#",
        },
        {
            title:"Credit Notes",
            href:"#",
        },
    ]

    return(
        <div className={`${showSidebar?"w-56 min-h-screen bg-slate-800 text-slate-50 fixed lg:block z-50":"w-56 min-h-screen bg-slate-800 text-slate-50 fixed hidden lg:block z-50"}`}>
            {/** Top Part*/}
            <div className="flex flex-col">
                {/** Logo*/}
                <Link href="#" className="bg-slate-950 flex space-x-2 items-center py-4 px-4">
                    <ShoppingCart/>
                    <span className="text-xl font-semibold">Inventory </span>
                </Link>
                {/** Links*/}
                <nav className="flex flex-col gap-3 px-3 py-6">
                    <Link href="/dashboard/home/overview" className="flex items-center space-x-2 text-slate-50 p-2 rounded-md" >
                        <Home className="w-4 h-4"/>
                        <span >Home</span>
                    </Link>
                    
                    <SidebarDropdownLink title="Inventory" items={inventoryLinks} icon={BaggageClaim} setShowSidebar={setShowSidebar}/>


                    <SidebarDropdownLink title="Sales" items={salesLinks} icon={ShoppingBasket}/>

                    
                    <button className="p-2 flex items-center space-x-2">
                        <ShoppingBag className="w-4 h-4"/>
                        <span >Purchases</span>
                    </button>

                    <Link href="#" className="p-2 flex items-center space-x-2" >
                        <Cable className="w-4 h-4"/>
                        <span >Integrations</span>
                    </Link>

                    <Link href="#" className="p-2 flex items-center space-x-2" >
                        <BarChart4 className="w-4 h-4"/>
                        <span >Reports</span>
                    </Link>

                    <Link href="#" className="p-2 flex items-center space-x-2" >
                        <Paperclip   className="w-4 h-4"/>
                        <span >Documents</span>
                    </Link>
                </nav>
            </div>
            
            {/** Bottom*/}
            <div className="flex flex-col mt-48">
                 {/** Subscription Card*/}
                {/** Footer Icon*/}
                <button className="bg-slate-950 flex space-x-2 items-center py-4 px-4 justify-center min-h-20" onClick={()=> setShowSidebar(false)}>
                    <ChevronLeft/>
                </button>
            </div>

        </div>
    )
}