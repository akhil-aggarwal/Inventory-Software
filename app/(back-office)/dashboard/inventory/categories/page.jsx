import React from "react";
import FixedHeader from "@/components/dashboard/FixedHeader";
import DataTable from "@/components/dashboard/DataTable";
import { getData } from "@/lib/getData";
export default async function Categories()
{   const units = await getData("categories")
    const columns = ["title", "description", "createdAt", "updatedAt"]
    return(
        <div>
            {/* Header */}
            <FixedHeader title="Categories" newLink="/dashboard/inventory/categories/new" />
            {/* Table */}
            <div className="my-4 p-8">
            <DataTable data={units} columns={columns} resourceTitle="categories"/>
            </div>
            
        </div>
    )
}