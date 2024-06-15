import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const client = createClient()

    const res = await client.from("movie").select("*")

    return Response.json( res.data )
}
