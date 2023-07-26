import https from "https";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import {MONGO_CONNECTION_STRING, PORT, SSL_KEY, SSL_CRT} from "$/src/config/environment.js";


const createApp = async () => {
    const app = express();
    app.disable("x-powered-by");
    app.use(cors());
    app.use(express.json());
    app.use("/", express.static("./public", {
        extensions: ["html"]
    }));
    app.use((req, res) => {
        res.sendStatus(404);
    });
    app.use((err, req, res, next) => {
        res.sendStatus(err.status? err.status: 500);
    });
    await mongoose.connect(MONGO_CONNECTION_STRING);
    https.createServer({
        key: Buffer.from(SSL_KEY.replaceAll("\\n", "\n")),
        cert: Buffer.from(SSL_CRT.replaceAll("\\n", "\n"))
    }, app).listen(PORT, () => {
        console.log(`${PORT} | ${app.get("env")}`);
    });
}
if(import.meta.url.replaceAll(/[\/ \\]/g, "") === `file://${process.argv[1]}`.replaceAll(/[\/ \\]/g, "")){
    createApp().catch((err) => {console.error(err)});
}
export default createApp