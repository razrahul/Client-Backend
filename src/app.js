import express from "express";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";



config({
    path: "./.env",
  });


const app = express();

const corsOptions = {
  origin: [process.env.LOCALHOST_URL, process.env.FRONTEND_URL], // Allows all origins
  methods: ["GET","POST","PUT","DELETE"],
  credentials: true, // Allows cookies and other credentials to be sent with the request
};



app.use(cors(corsOptions)); // Enable CORS for all origins

//using middlewares
app.use(express.json());
app.use(
  express.urlencoded({
      extended: true,
  })
)

app.use(cookieParser());

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is working",
  });
});


app.get("/cheack", (req, res) => {
  res.send("Nice working");
});





export default app;
