import app from "./app.js";




const Port = process.env.PORT;

app.listen(Port, () => {
    console.log(`Server is running on port ${Port}`)
    // logger.info("⚙️  Server is running on port: " + process.env.PORT);
})



