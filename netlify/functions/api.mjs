import express from "express";
import serverless from "serverless-http";

const api = express();

const router = require('../../server'); // Ugly

api.use("/api/", router);

export const handler = serverless(api);