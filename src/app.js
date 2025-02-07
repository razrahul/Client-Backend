import express from "express";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import ErrorMiddleware from "./middlewares/Error.js";
import morganMiddleware from "./logger/morgan.logger.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.json' assert {type:'json'};

config({
    path: "./.env",
  });


const app = express();

//loger
app.use(morganMiddleware);

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

// Importing & using Routes
import UserRouter from "./routes/user.route.js";
import areaRoutes from "./routes/area.route.js";
import cityRoutes from "./routes/city.route.js";
import contactFormRoutes from "./routes/contactForm.route.js";
import teacherRoutes from "./routes/teacher.route.js";


app.use("/api/v1", UserRouter);
app.use("/api/v1", areaRoutes);
app.use("/api/v1", cityRoutes);
app.use("/api/v1", contactFormRoutes);
app.use("/api/v1", teacherRoutes);


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default app;

app.use(ErrorMiddleware);