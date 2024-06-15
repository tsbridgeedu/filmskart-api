import { createClient } from "@/utils/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const { getToken } = await auth()

    const token: string | null = await getToken({ template: "supabase" })

    if(token === null)
        return Response.json({status: 400, msg: "User not found"})

    const client = createClient(token)

    const res = await client.from("address").select("*")

    return Response.json( res.data )
}

export async function PUT(req: Request) {
    const body = await req.json()

    if(body.address === undefined)
        return Response.json({status: 400, msg: "Address not found"})

    const { getToken } = await auth()

    const token: string | null = await getToken({ template: "supabase" })

    if(token === null)
        return Response.json({status: 400, msg: "User not found"})

    const client = createClient(token)

    const res = await client.from("address").insert({"address": body.address}).select()

    if(res.error !== null)
        return Response.json({status: 400, msg: "Error Adding Address"})

    return Response.json({status: 200, msg: "Address Added", data: res.data})
}

export async function PATCH(req: Request) {
    const body = await req.json()

    if(body.address === undefined || body.id === undefined)
        return Response.json({status: 400, msg: "Address not found"})

    const { getToken } = await auth()

    const token: string | null = await getToken({ template: "supabase" })

    if(token === null)
        return Response.json({status: 400, msg: "User not found"})

    const client = createClient(token)

    const res = await client.from("address").update({"address": body.address}).eq("id", body.id).select()

    if(res.error !== null)
        return Response.json({status: 400, msg: "Error Updating Address"})

    return Response.json({status: 200, msg: "Address updated", data: res.data})
}

export async function DELETE(req: NextRequest) {
    const body = await req.json()
    
    const { getToken } = await auth()

    const token: string | null = await getToken({ template: "supabase" })

    if(token === null)
        return Response.json({status: 400, msg: "User not found"})

    const client = createClient(token)

    const res = await client.from("address").delete().eq("id", body.id)

    if(res.error !== null)
        return Response.json({status: 400, msg: "Error Deleting Address"})

    return Response.json({status: 200, msg: "Address Deleted"})
}