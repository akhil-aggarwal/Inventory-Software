import { Carter_One } from "next/font/google";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request){
    try {
        const {title,location,type,description} = await request.json();
        const warehouse = await db.warehouse.create(
            {
                data:{
                    title,
                    location,
                    description,
                    warehouseType: type
                }
            }
        );
        console.log(warehouse);
        return NextResponse.json(warehouse);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to create Warehouse",
            },
            {
                status: 500
            })
    }

}

export async function GET(request)
{
    try {

        const warehouse = await db.warehouse.findMany({
            orderBy: {
                createdAt: 'desc', //latest warehouse first
            },
            include: {
                items: true
            }

        })

        return NextResponse.json(warehouse);
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to fetch Warehouse",
            },
            {
                status: 500
            })
    }
}

export async function DELETE(request){
    try {
        const id = request.nextUrl.searchParams.get("id");
        
        const deleteWarehouse = await db.warehouse.delete({
            where:{
                id
            },
        })
        console.log(deleteWarehouse );
        return NextResponse.json(deleteWarehouse);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to Delete Warehouse",
            },
            {
                status: 500
            })
    }
}