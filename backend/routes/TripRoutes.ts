import { Router } from "express";
import { TripCtrl } from "../controllers/TripCtrl"

const router = Router();
export default router.get("/",(req,res)=>{
    TripCtrl(req,res)
});
