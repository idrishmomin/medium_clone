import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, verify } from "hono/jwt";
import { blogInput, blogupdateInput } from "@idrishmomin/zodcommon";

export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        authorId: string;
    }
}>();


blogRoute.use("/*", async (c, next) => {
    const autToken = c.req.header("authorization") || "";
    const user = await verify(autToken, c.env.JWT_SECRET);

    if (user) {
        c.set("authorId", user.id);
        await next();
    } else {
        c.status(403);
        return c.json({
            response: "you are not logedin"
        })
    }

});


blogRoute.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const authorId = c.get("authorId");

    const body = await c.req.json();

    const { success } = blogInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            error: "Invalid parameters"
        })
    }

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            published: body.published,
            authorId: authorId,
        }
    })

    return c.json({ id: blog.id });
})

blogRoute.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const { success } = blogupdateInput.safeParse(body);
    if (!success) {
        c.status(411);
        return c.json({
            error: "Invalid parameters"
        })
    }

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({ id: blog.id });
})


blogRoute.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    try {
        const blogs = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return c.json({ blogs });
    } catch (e) {
        c.status(411);
        c.json({ error: "Blog's not found" });
    }
})


blogRoute.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const id = c.req.param("id");
    try {
        const blog = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({ blog });
    } catch (e) {
        c.status(411);
        c.json({ error: "Blog not found" });
    }
})

