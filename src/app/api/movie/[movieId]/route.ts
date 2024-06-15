import { createClient } from "@/utils/supabase/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { movieId: string } }) {
    const client = createClient()

    const res = await client.from("movie").select().eq("id", params.movieId)

    if(res.data?.length == 1)
        return Response.json( res.data[0] )
    else
        return Response.json( {error: "Movie not found"} )
}
