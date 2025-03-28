import {Hono} from 'hono';
import {handle} from 'hono/vercel'

export const runtime ="nodejs"



const app = new Hono().basePath('/api');

app.get('/test',(c)=>{
    return c.json({hono:"testing"})
})



//as route is reserved keyword and its expect either get post put delte 
//so we have to wrap it inorder to work 
export const GET=handle(app);