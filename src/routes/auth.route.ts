import express, {Request, Response} from "express";
import UserAuthController from "../controllers/userAuthController";
const router = express.Router();

router.post('/api/auth/register', (req: Request, res: Response) =>{
    UserAuthController.registerUser(req, res);
})
router.post('/api/auth/login',  (req: Request, res: Response) =>{
    UserAuthController.loginUser(req, res);
})
export default router;