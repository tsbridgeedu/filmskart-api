import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { stat } from "fs";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const user = await currentUser()

    if(user === null)
        return Response.json({user: null})

    const res = {
        "id": user?.id,
        "username": user?.username,
        "profileImage": user?.imageUrl,
        "first_name": user?.firstName,
        "last_name": user?.lastName,
        "public_metadata": user?.publicMetadata,
    }

    return Response.json(res)
}

export async function PATCH(req: Request) {

    const user = await currentUser()
    const res = {
        status: 200,
        msg: "Success"
    }

    if(user === null)
        return Response.json({status: 400, msg: "User not found"})

    const body = await req.json()

    if(body.firstName != null){
        await clerkClient.users.updateUser(user.id, {
            "firstName": body.firstName
        })
    }

    if(body.lastName !== null){
        await clerkClient.users.updateUser(user.id, {
            "lastName": body.lastName
        })
    }

    if(body.tagline != null){
        await clerkClient.users.updateUserMetadata(user.id, {
            publicMetadata: {
              "tagline": body.tagline
            }
        })
    }
    if(body.bio != null){
        await clerkClient.users.updateUserMetadata(user.id, {
            publicMetadata: {
              "bio": body.bio
            }
        })
    }

    return Response.json({ res })
}