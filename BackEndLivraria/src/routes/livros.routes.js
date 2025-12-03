import { 
    criarLivro, 
    listaLivro, 
    obterLivro, 
    atualizarLivro, 
    deletarLivro } from "../controllers/livros.controller.js";

import express from "express"; 
// const express = require("express") // MESMA COISA QUE A LINHA DE CIMA

const router = express.Router();

router.get("/", listaLivro);
router.post("/", criarLivro);
router.get("/:id", obterLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id", deletarLivro);

export default router;

