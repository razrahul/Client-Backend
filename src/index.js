import app from "./app.js";
import { config } from 'dotenv';

config();

const Port = process.env.PORT || 5000;  // Ensure a default port is set

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`);
    // logger.info("⚙️  Server is running on port: " + process.env.PORT);
});



