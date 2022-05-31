import "reflect-metadata"; 
import express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { Routes } from "./routes"
import morgan from "morgan"
import { validationResult } from "express-validator";
import cors from 'cors'
function handleError(err, req, res, next){
    res.status(err.statusCode || 400).send({message: err.message});
}

// create express app
const app = express()
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json())

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, 
        //check each validations in routes.ts
        ...route.validation,
        async(req: Request, res: Response, next: Function) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors: errors.array()})
            }
            const result = await(new (route.controller as any))[route.action](req, res, next);
            res.status(200).json(result);
        } catch(error){
            next(error);
        }
    });
});

app.use(handleError);

export default app;
