import express from "express"
import "dotenv/config"
import database from "./utils/database.js";
import router from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import postRouter from "./routes/postRoute.js";

const app = express();
app.use(cookieParser())


app.use(express.json());
const port = process.env.PORT  || 4000

database();

app.use("/api",router)
app.use("/post",postRouter)



app.listen(port,() => {
    console.log(`Server is running at ${port}`);
})

