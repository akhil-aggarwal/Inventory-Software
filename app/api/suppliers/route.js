import { Carter_One } from "next/font/google";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request){
    try {
        const {title, phone, email, address, contactPerson, supplierCode, taxID, paymentTerms, notes} = await request.json();
        const supplier = await db.supplier.create(
            {
                data:{
                    title,
                    phone,
                    email,
                    address,
                    contactPerson,
                    supplierCode,
                    taxID,
                    paymentTerms,
                    notes
                }
            }
        );
        console.log(supplier);
        return NextResponse.json(supplier);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to create Supplier",
            },
            {
                status: 500
            })
    }

}

export async function GET(request)
{
    try {

        const suppliers = await db.supplier.findMany({
            orderBy: {
                createdAt: 'desc', //latest supplier first
            }
        })

        return NextResponse.json(suppliers);
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to fetch Supplier",
            },
            {
                status: 500
            })
    }
}

export async function DELETE(request){
    try {
        const id = request.nextUrl.searchParams.get("id");
        
        const deleteSupplier = await db.supplier.delete({
            where:{
                id
            },
        })
        console.log(deleteSupplier);
        return NextResponse.json(deleteSupplier);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to Delete Supplier",
            },
            {
                status: 500
            })
    }
}