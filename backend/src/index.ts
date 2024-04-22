import { Hono } from 'hono'
import { userRoute } from './routes/user';
import { blogRoute } from './routes/blog';

const app = new Hono();

app.route("/api/v1/user", userRoute);
app.route("/api/v1/blog", blogRoute);

export default app

// mysql://avnadmin:AVNS_eb3teeYpA2nI7tcrbJO@mysql-2b8133a6-idrish2455-9c44.d.aivencloud.com:15134/defaultdb?ssl-mode=REQUIRED

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiOTFjNmYzYzQtMTE1NC00ZmNmLWI4NzItMDRkOGYzMTBlNjg2IiwidGVuYW50X2lkIjoiODM2MTBmYTQ4NmQ5MTJhMGMzZDVmOTA5N2ZhZDZjYTcwMTQzOTg3NzE1MGZjOGNjMDU1YTRhZDIwNGJkMjJiZiIsImludGVybmFsX3NlY3JldCI6IjM3OWFiZWVjLTFkMjItNDEyZi05Yzc3LWNmNjMyMjVmNmI1MiJ9.enZz3PD0H203sBFMU7yiLyAw-EMtoSmHuVt7beLYyrs"
