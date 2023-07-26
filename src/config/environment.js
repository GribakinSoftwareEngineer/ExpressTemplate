import * as dotenv from "dotenv"


if(process.env.NODE_ENV !== "production") {
    dotenv.config({path: "./.env"});
}

export const SSL_CRT = process.env.SSL_CRT;
export const SSL_KEY = process.env.SSL_KEY;
export const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
export const PORT = process.env.PORT || 443;