import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request,{params:{id}})
{
    try {

        const item = await db.item.findUnique({
            where: {
                id
            },
            include: {
                warehouse: true,
                
            }
        })

        return NextResponse.json(item);
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to fetch Item",
            },
            {
                status: 500
            })
    }
}

export async function PUT(request,{params:{id}})
{
    try {
        const itemData = await request.json()

        const item = await db.item.update({
            where: {
                id
            },
            data : {
                title: itemData.title,
                    category: { connect: { id: itemData.categoryId} },
                    sku : itemData.sku, 
                    barcode : itemData.barcode, 
                    quantity : parseInt(itemData.qty), 
                    unit: { connect: { id: itemData.unitId} },
                    brand: { connect: { id: itemData.brandId} },
                    buyingPrice : parseFloat(itemData.buyingPrice),
                    sellingPrice : parseFloat(itemData.sellingPrice),
                    supplier: { connect: { id: itemData.supplierId} },
                    reOrderPoint : parseInt(itemData.reOrderPoint),
                    warehouse: { connect: { id: itemData.warehouseId} },
                    imageUrl : itemData.imageUrl,
                    weight : parseFloat(itemData.weight),
                    dimensions : itemData.dimensions,
                    taxRate : parseFloat(itemData.taxRate), 
                    description : itemData.description,
                    notes : itemData.notes
            }
        })

        return NextResponse.json(item);
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to update Item",
            },
            {
                status: 500
            })
    }
}

export async function DELETE(request){
    try {
        const id = request.nextUrl.searchParams.get("id");
        
        const deleteItem = await db.item.delete({
            where:{
                id
            },
        })
        console.log(deleteItem);
        return NextResponse.json(deleteItem);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to Delete Item",
            },
            {
                status: 500
            })
    }
}