import {Hono} from 'hono';
import {handle} from 'hono/vercel'
import user from './user'

export const runtime ="nodejs"



const app = new Hono().basePath('/api');

app.get('/test',(c)=>{
    return c.json({hono:"testing the hono api "})
})

//groupoing routes for large production aplication we use grouping 
app.route("/user",user)


//as route is reserved keyword and its expect either get post put delte 
//so we have to wrap it inorder to work 
export const GET=handle(app);