import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import { success } from "zod";
import router from "./routes";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();

app.use(express.json())

app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/v1",router);

app.get('/',(req,res)=>{
    res.json({
        success:true,
        message:"Customer Support API Running",
    });
});
app.use(globalErrorHandler)

export default app;