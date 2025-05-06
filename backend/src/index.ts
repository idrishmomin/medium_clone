import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { userRoute } from './routes/user'
import { blogRoute } from './routes/blog'
import { cors } from 'hono/cors'
import * as dotenv from 'dotenv'

dotenv.config() // Load environment variables from .env

// Initialize Hono app
const app = new Hono<{
  Bindings: {
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

// CORS middleware
app.use('/*', cors())

// Directly access environment variables in routes
app.use('*', async (c, next) => {
  c.env.DATABASE_URL = process.env.DATABASE_URL || ''
  c.env.JWT_SECRET = process.env.JWT_SECRET || ''
  await next()
})

// Route binding function for user and blog routes
app.route('/api/v1/user', userRoute)
app.route('/api/v1/blog', blogRoute)

// Serve the application
serve({
  fetch: app.fetch,
  port: 3000,
})
