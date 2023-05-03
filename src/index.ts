import express, { Request, Response } from "express";
import { router } from "./routes";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("send funcionou");
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Está rodando na porta ${PORT})`);
});
