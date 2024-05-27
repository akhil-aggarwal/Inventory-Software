import { Carter_One } from "next/font/google";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request){
    try {
        const {title} = await request.json();
        const brand = await db.brand.create(
            {
                data:{title}
            }
        );
        console.log(brand);
        return NextResponse.json(brand);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to create Brand",
            },
            {
                status: 500
            })
    }

}

export async function GET(request)
{
    try {

        const brands = await db.brand.findMany({
            orderBy: {
                createdAt: 'desc', //latest category first
            }
        })

        return NextResponse.json(brands);
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to fetch Brand",
            },
            {
                status: 500
            })
    }
}

export async function DELETE(request){
    try {
        const id = request.nextUrl.searchParams.get("id");
        
        const deleteBrand = await db.brand.delete({
            where:{
                id
            },
        })
        console.log(deleteBrand);
        return NextResponse.json(deleteBrand);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to Delete Brand",
            },
            {
                status: 500
            })
    }
}