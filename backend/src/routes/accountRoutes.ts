import express from "express";
import { getBalance, sendTransaction } from "../controllers/accountController";

const router = express.Router();

router.post("/", getBalance);
router.post("/transaction", sendTransaction);

export default router;
