import { 
    criarReserva, 
    listarReservas,   
    excluirReserva } from "../controllers/reservas.controller.js";

import express from "express"; 
// const express = require("express") // MESMA COISA QUE A LINHA DE CIMA

const router = express.Router();

router.get("/", listarReservas);
router.post("/", criarReserva);
router.delete("/:id", excluirReserva);

export default router;

