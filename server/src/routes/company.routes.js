import express from "express";
import { createCompany } from "../controllers/company.controller.js";

const router = express.Router();

router.post("/", createCompany);

export default router;
