const express = require('express')
const config = require('config')
const router = require("./routes/auth.routes");
const app = express();
const PORT = config.get('serverPort');
const corsMiddleware = require("./middleware/cors.middleware")

app.use(corsMiddleware)
app.use(express.json())
app.use('/api/auth', router)
const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`server started on port ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}
start()