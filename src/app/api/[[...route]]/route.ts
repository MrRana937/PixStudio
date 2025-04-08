import {Hono} from 'hono';
import {handle} from 'hono/vercel'
export const runtime ="nodejs"
import images from "./images"


const app = new Hono().basePath('/api');


const routes=app.route("/images",images)


//as route is reserved keyword and its expect either get post put delte 
//so we have to wrap it inorder to work 
export const GET=handle(app);

export type AppType= typeof routes;