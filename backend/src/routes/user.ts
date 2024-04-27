import { signinInput, signupInput } from '@idrishmomin/zodcommon';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();


userRoute.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            error: "Invalid parameters"
        })
    }

    try {
        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password,
                name: body.name
            }
        });

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.text(jwt);

    } catch (e) {
        c.status(403)
        return c.json({ error: "Error while signing Up" })
    }

})

userRoute.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())


    const body = await c.req.json();
     const { success } = signinInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            error: "Invalid parameters"
        })
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
                password: body.password
            }
        })

        if (!user) {
            c.status(403);
            return c.json({ error: "Unathorised" });
        }

        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.text(jwt);

    } catch (e) {
        c.status(411)
        return c.json({ error: "Invalid" });
    }

})