import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import routes from "./routes";

morgan('tiny')

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/',(req: Request,res: Response) => {
//     return res.json({
//         success: true,
//         name: "ApiwatDev"
//     })
// })

// app
//   .route("/")
//   .get((req: Request, res: Response) => {
//     return res.send("You make a GET request");
//   })
//   .post((req: Request, res: Response) => {
//     return res.send("You make a POST request");
//   });

// app.all('/api/all',(req: Request,res: Response)=>{
//     return res.sendStatus(200)
// })
// app.post('/api/data', (req: Request,res: Response) => {
//     console.log(req.body)
//     return res.sendStatus(200)
// })


function handleGetBook(req: Request, res:Response, next: NextFunction){
    console.log(req.params)
    return res.send(req.params)
}



app.get('/api/books/:bookId/:authorId',handleGetBook)

app.get('/api/next/function/:id', (req:Request,res:Response,next:NextFunction)=>{
    next()
},(req:Request,res:Response,next:NextFunction)=>{
    return res.send(req.params)
})

// app.get('/api/generics', (req:Request<{paramsName:string}, {}, {body: string}>,res:Response)=>{
//     console.log(req.params.paramsName)

// })

app.get("/error", async (req,res)=>{

})

routes(app)

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});
