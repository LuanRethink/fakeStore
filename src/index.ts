import { errorHandler } from "./middlewares/errorHandler";
import express, { Request, Response } from "express";
import { router } from "./routes";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("App rodando, visite outras rotas");
});

app.use("/", router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Está rodando na porta ${PORT})`);
});
