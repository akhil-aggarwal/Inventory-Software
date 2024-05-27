import db from "@/lib/db";
import { Carter_One } from "next/font/google";
import { NextResponse } from "next/server";

export async function POST(request){
    try {
        const {transferStockQty, 
            itemId,
            givingWarehouseId, 
            recievingWarehouseId ,
            notes,
            referenceNumber} = await request.json();

            // Item in giving Warehouse
            const item = await db.item.findUnique({
                where:{
                    id: itemId
                },
            });

            

            //Get the giving Warehouse
            const givingWarehouse = await db.warehouse.findUnique({
                where: {
                    id : givingWarehouseId
                },
            })

            //Get Current Stock Giving Warehouse
            const currentGivingWarehouseStock = givingWarehouse.stockQty;

            if(parseInt(currentGivingWarehouseStock) > parseInt(transferStockQty))
                {
                    const newStockForGivingWarehouse = parseInt(currentGivingWarehouseStock) - parseInt(transferStockQty);

                    //Update Stock Giving Warehouse
                    const updatedGivingWarehouse = await db.warehouse.update({
                        where: {
                            id : givingWarehouseId
                        },
                        data : {
                            stockQty : newStockForGivingWarehouse,
                        }
                    })

                    // const updatedItemInGivingWarehouse = await db.item.update({
                    //     where: {
                    //         id : itemId,
                    //     },
                    //     data : {
                    //         warehouseId : givingWarehouseId,
                    //         quantity: newStockForGivingWarehouse
                    //     }
                    // })
        
                    //Get the recieving Warehouse
                    const recievingWarehouse = await db.warehouse.findUnique({
                        where: {
                            id : recievingWarehouseId
                        },
                    })
        
                    //Get Current Stock
                    const currentRecievingWarehouseStock = recievingWarehouse.stockQty;
                    const newStockForRecieveingWarehouse = parseInt(currentRecievingWarehouseStock) + parseInt(transferStockQty);
        
                    //Update Stock
                    const updatedRecievingWarehouse = await db.warehouse.update({
                        where: {
                            id : recievingWarehouseId
                        },
                        data : {
                            stockQty : newStockForRecieveingWarehouse
                        }
                    })

                    
                    

                    const transfer = await db.transferStockAdjustment.create(
                        {
                            data:{       
                                transferStockQty : parseInt(transferStockQty), 
                                itemId,
                                givingWarehouseId, 
                                recievingWarehouseId ,
                                notes,
                                referenceNumber
                            }
                        }
                    );
                    console.log(transfer);
                    return NextResponse.json(transfer);

                }
            else{
                return NextResponse.json({
                    data: null,
                    message: "Giving Warehouse has no enough stock"
                },{status: 409});
            }


           

            
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to make Transfer",
            },
            {
                status: 500
            })
    }

}

export async function GET(request)
{
    try {

        const adjustments = await db.transferStockAdjustment.findMany({
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
        
        const deletedAdjustment = await db.transferStockAdjustment.delete({
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
                message: "Failed to Delete Transfer Adjustment",
            },
            {
                status: 500
            })
    }
}