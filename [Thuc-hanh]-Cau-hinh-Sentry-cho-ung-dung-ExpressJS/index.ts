import express from "express";

import bodyParser from "body-parser";

import * as Sentry from "@sentry/node";

import * as Tracing from "@sentry/tracing";

const PORT = 3000;
const app = express();

Sentry.init({

    dsn: "https://8db1440ec9f24acda5dcd870516607d5@o1313411.ingest.sentry.io/6563528",

    integrations: [

        new Sentry.Integrations.Http({ tracing: true }),

        new Tracing.Integrations.Express({ app }),

    ],
    tracesSampleRate: 1.0,
});

app.use(bodyParser.json());

app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());app.get("/", function rootHandler(req, res) {

    res.end("Hello world!");

});



app.use(Sentry.Handlers.errorHandler());



app.use(function onError(err, req, res, next) {

    res.statusCode = 500;

    res.end(res.sentry + "\n");

});



app.get("/debug-sentry", function mainHandler(req, res) {

    throw new Error("My first Sentry error!");

});



app.listen(PORT, () => {

    console.log("App running on port: " + PORT)

})