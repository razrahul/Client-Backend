import app from "./App.js";
import {connectDB} from "./config/database.js"
import logger from "./logger/winston.logger.js";

connectDB();



const Port = process.env.PORT;

app.listen(Port, () => {
    // console.log(`Server is running on port ${Port}`)
    logger.info("⚙️  Server is running on port: " + process.env.PORT);
})



