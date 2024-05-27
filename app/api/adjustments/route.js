import { Carter_One } from "next/font/google";
import { NextResponse } from "next/server";


export async function POST(request){
    try {
        const {transferStockQty,recievingBranchId,notes} = await request.json();
        const adjustments = {transferStockQty,recievingBranchId,notes};
        console.log(adjustments);
        return NextResponse.json(adjustments);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to make Adjustment",
            },
            {
                status: 500
            })
    }

}

