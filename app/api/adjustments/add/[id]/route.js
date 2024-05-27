import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request,{params:{id}})
{
    try {

        const adjustment = await db.addStockAdjustment.findUnique({
            where: {
                id
            }
        })

        return NextResponse.json(adjustment);
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to fetch Add Adjustment",
            },
            {
                status: 500
            })
    }
}

export async function PUT(request,{params:{id}})
{
    try {
        const {
            addStockQty,
            itemId, 
            recievingWarehouseId, 
            notes, 
            referenceNumber,
            supplierId
            } = await request.json()

        
        // // Get the item
        const itemToUpdate = await db.item.findUnique({
            where : {
                id : itemId,
            }
            })

         //Current Item Qty
         const currentItemQty = itemToUpdate.quantity;
         const newQty = parseInt(currentItemQty) + parseInt(addStockQty);
 
         //Modify the item to the new Qty
         const updatedItem = await db.item.update(
        {   
         where :{
             id : itemId,
 
         },
         data:{       
             quantity : newQty,
         }
        }
             )
        
        //Affect the Warehouse 
        // Warehouse thing copied from Item/route.js
        //Get the Warehouse
         const warehouse = await db.warehouse.findUnique({
            where : {
                id: recievingWarehouseId
            }
        });
        //Current Stock in Warehouse
        const currentWarehouseStock = warehouse.stockQty;
        const newStockQty = parseInt(currentWarehouseStock) + parseInt(addStockQty);
        //Update the Stock on the Warehouse 
        const updatedWarehouseStock = await db.warehouse.update({
            where : {
                id: recievingWarehouseId
            },
            data : {
                stockQty : newStockQty
            }
        })  


        const adjustment = await db.addStockAdjustment.update({
            where: {
                id
            },
            data : {
                addStockQty,
                itemId, 
                recievingWarehouseId, 
                notes, 
                referenceNumber,
                supplierId
            }
        })

        return NextResponse.json(adjustment);
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to update Add Adjustment",
            },
            {
                status: 500
            })
    }
}