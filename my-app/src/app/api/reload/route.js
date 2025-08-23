    import { getServerSession } from "next-auth";
    import { authOptions } from "../auth/[...nextauth]/route";
    import { dbconnect } from "@/db";
    import { User } from "@/models/user.model.js";
    import { NextResponse } from "next/server";

    export async function GET() {
    await dbconnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user?._id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findById(session.user._id).lean();
    return NextResponse.json({ user });
    }
