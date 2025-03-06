import { NextApiRequest } from "next";
import { db } from "./db";
import { auth } from "@/auth";

const serverAuth = async (req: NextApiRequest) => {
    const session = await auth();

    if (!session?.user?.email) {
        throw new Error('Not signed in')
    }

    const currentUser = await db.user.findUnique({
        where: {
            email :session.user.email
        }
    })

    if (!currentUser) {
        throw new Error("Not signed in")
    }

    return {currentUser}
}

export default serverAuth;