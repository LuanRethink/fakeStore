import { Router } from "express";
import loginController from "../controllers/loginController";

const router: Router = Router();

router.post("/newUser", loginController.newUser);
router.post("/", loginController.login);

export { router };
