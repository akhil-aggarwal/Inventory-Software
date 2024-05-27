import { Carter_One } from "next/font/google";
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(request){
    try {
        const {title, abbreviation} = await request.json();
        const unit = await db.unit.create(
            {
                data:{title, abbreviation}
            }
        );
        console.log(unit);
        return NextResponse.json(unit);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to create Unit",
            },
            {
                status: 500
            })
    }

}

export async function GET(request)
{
    try {

        const units = await db.unit.findMany({
            orderBy: {
                createdAt: 'desc', //latest unit first
            }
        })

        return NextResponse.json(units);
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to fetch Unit",
            },
            {
                status: 500
            })
    }
}

export async function DELETE(request){
    try {
        const id = request.nextUrl.searchParams.get("id");
        
        const deleteUnit = await db.unit.delete({
            where:{
                id
            },
        })
        console.log(deleteUnit);
        return NextResponse.json(deleteUnit);
    } catch (error) {
        console.log(error)
        return NextResponse.json({
                error,
                message: "Failed to Delete Unit",
            },
            {
                status: 500
            })
    }
}