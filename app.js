const express = require("express");
const config = require("config");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ extended: true }))

app.use("/api/auth/", require("./routes/auth.routes"));

app.use("/api/link", require('./routes/link.routes'))

app.use('/t', require('./routes/redirect.routes'))

const PORT = config.get("port") || 5050


async function start () {
    try {

        const mongoUri = config.get("mongoUri");
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));

    } catch (e) {
        
        console.log("Server error : ", e.message);
        process.exit(1);
    
    }
}


start()