import { 
    criarAvaliacao, 
    listaAvaliacao, 
    obterAvaliacao, 
    atualizarAvaliacao, 
    deletarAvaliacao } from "../controllers/avaliacoes.controller.js";

import express from "express"; 
// const express = require("express") // MESMA COISA QUE A LINHA DE CIMA

const router = express.Router();

router.get("/", listaAvaliacao);
router.post("/", criarAvaliacao);
router.get("/:id", obterAvaliacao);
router.put("/:id", atualizarAvaliacao);
router.delete("/:id", deletarAvaliacao);

export default router;

