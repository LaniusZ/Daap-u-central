import dotenv from "dotenv";
import { v4 as uuid } from 'uuid';
import express, { Express, Request, Response } from "express";
import { getDigitalIdentityContract, getHelloWorldContract } from "./contract";

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
  const contract = getDigitalIdentityContract();
/*
  await contract.addPerson(
    req.query.name as string,
    req.query.lastname as string,
    Number(req.query.age),
    req.query.id as string
  );
*/
  const id: string = uuid();

  console.log('Your UUID is: ' + id);

  res.json({
    result: id,
  });
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
      lastname: person[2]
    });
  } else {
    res.json({
      status: false,
      message: "Titulo no encontrado"
    });
  }
  } catch {
    res.json({
      status: false
    });
  }
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: DApp API Server is running at http://localhost:${port}`
  );
});
