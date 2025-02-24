import { getDataFromToken } from "@/lib/getDataFormToken";
import User from "@/lib/models/User";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB()
    
    let userId = getDataFromToken(req);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return new NextResponse("User not found", { status: 404 })
    }

    const { productId } = await req.json()

    if (!productId) {
      return new NextResponse("Product Id required", { status: 400 }) 
    }

    const isLiked = user.wishlist.includes(productId)

    if (isLiked) {
      user.wishlist = user.wishlist.filter((id: string) => id !== productId)
    } else {
      user.wishlist.push(productId)
    }

    await user.save()
    
    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.log("[wishlist_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}