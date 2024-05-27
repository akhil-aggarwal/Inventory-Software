import { Carter_One } from "next/font/google";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request){
    try {
        const {
            addStockQty,
            itemId, 
            recievingWarehouseId, 
            notes, 
            referenceNumber,
            supplierId
            } = await request.json();

        const data  = {
            addStockQty,
            itemId, 
            recievingWarehouseId, 
            notes, 
            referenceNumber,
            supplierId
        }    


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

        const adjustment = await db.addStockAdjustment.create(
            {
                data:{       
                    addStockQty : parseInt(addStockQty), 
                    itemId,
                    recievingWarehouseId ,
                    notes,
                    referenceNumber,
                    supplierId
                }
            }
        );

           

        return NextResponse.json(adjustment);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to Add Stock",
            },
            {
                status: 500
            })
    }

}

export async function GET(request)
{
    try {

        const adjustments = await db.addStockAdjustment.findMany({
            orderBy: {
                createdAt: 'desc', //latest category first
            }
        })

        return NextResponse.json(adjustments);
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to fetch Adjustments",
            },
            {
                status: 500
            })
    }
}


export async function DELETE(request){
    try {
        const id = request.nextUrl.searchParams.get("id");
        
        const deletedAdjustment = await db.addStockAdjustment.delete({
            where:{
                id
            },
        })
        console.log(deletedAdjustment);
        return NextResponse.json(deletedAdjustment);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to Delete Add Adjustment",
            },
            {
                status: 500
            })
    }
}