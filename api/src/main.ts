import dotenv from "dotenv";
import { v4 as uuid } from 'uuid';
import express, { Express, Request, Response } from "express";
import { getDigitalIdentityContract, getHelloWorldContract } from "./contract";
import {  validate, clean, format, getCheckDigit } from 'rut.js';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", async (req: Request, res: Response) => {
  const contract = getHelloWorldContract();
  const response = await contract.sayHelloWorld();
  res.json({
    message: response,
  });
});

app.get("/persons/count", async (req: Request, res: Response) => {
  const contract = getDigitalIdentityContract();
  const response = await contract.getPersonsCount();

  res.json({
    count: response.toNumber(),
  });
});

app.get("/persons/add", async (req: Request, res: Response) => {

  try {
    let isValid = true;
    let message = "";

    if (!req.query.name){
      isValid = false;
      message = "Name cannot be left empty";
    }

    if (!req.query.lastnamefather){
      isValid = false;
      message = "Lastname of Father cannot be left empty";
    }

    if (!req.query.lastnamemother){
      isValid = false;
      message = "Lastname of Mother cannot be left empty";
    }

    if (!req.query.run || !req.query.dv || !validate(req.query.run?.toString() + req.query.dv?.toString())){
      isValid = false;
      message = "run is invalid";
    }

    if (!req.query.career){
      isValid = false;
      message = "Career cannot be left empty";
    }

    if (Number(req.query.graduationYear) < 1900){
      isValid = false;
      message = "Graduation year must be upper 1900";
    }

    if (!isValid){
      res.json({
        status: isValid,
        message: message
      });
    } else {
      const contract = getDigitalIdentityContract();
      const id = uuid();

      await contract.addPerson(
        id,
        req.query.name as string,
        req.query.lastnamefather as string,
        req.query.lastnamemother as string,
        Number(req.query.run),
        req.query.dv as string,
        req.query.career as string,
        Number(req.query.graduationYear)
      );

      res.json({
        status: isValid,
        person: id
      });
    }

  } catch (error) {
    res.json({
      status: false,
      message: "Error desconocido"
    });

    console.log(error);
  }

});

app.get("/persons/get", async (req: Request, res: Response) => {
  try{
    const contract = getDigitalIdentityContract();

    let id = "";

    if (req.query.id != undefined) {
      id = req.query.id.toString();
    }

    const person = await contract.getPerson(id);

    if (person[0].length > 0){
      res.json({
        status: true,
        name: person[1],
        lastnameFather: person[2],
        lastnameMother: person[3],
        run: person[4].toNumber(),
        dv: person[5],
        career: person[6],
        graduationYear: person[7].toNumber()
      });
    } else {
      res.json({
        status: false,
        message: "Titulo no encontrado"
      });
    }
  }  catch (error) {
    res.json({
      status: false,
      message: "Error desconocido"
    });

    console.log(error);
  }
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: DApp API Server is running at http://localhost:${port}`
  );
});
