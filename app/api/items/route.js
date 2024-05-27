import { Carter_One } from "next/font/google";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request){
    try {

        
        const itemData = await request.json();

        //Get the Warehouse
        const warehouse = await db.warehouse.findUnique({
            where : {
                id: itemData.warehouseId
            }
        });
        //Current Stock in Warehouse
        const currentWarehouseStock = warehouse.stockQty;
        const newStockQty = parseInt(currentWarehouseStock) + parseInt(itemData.qty);
        //Update the Stock on the Warehouse 
        const updatedWarehouseStock = await db.warehouse.update({
            where : {
                id: itemData.warehouseId
            },
            data : {
                stockQty : newStockQty
            }
        })

        const item = await db.item.create(
            {
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
            }
        );
        console.log(item);
        return NextResponse.json(item);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to create Item",
            },
            {
                status: 500
            })
    }

}

export async function GET(request)
{
    try {

        const items = await db.item.findMany({
            orderBy: {
                createdAt: 'desc', //latest item first
            },
            include: {
                category: true, // Returns all category fields
                warehouse : true, // Returns all suppliers fields
            

            }
        })

        return NextResponse.json(items);
        
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