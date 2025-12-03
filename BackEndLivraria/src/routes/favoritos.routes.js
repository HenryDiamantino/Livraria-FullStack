import e from "cors";
import { 
    criarFavorito, 
    listarFavoritos,   
    excluirFavorito } from "../controllers/favoritos.controller.js";

import express from "express"; 
// const express = require("express") // MESMA COISA QUE A LINHA DE CIMA

const router = express.Router();

router.get("/", listarFavoritos);
router.post("/", criarFavorito);
router.delete("/:id", excluirFavorito);

export default router;

