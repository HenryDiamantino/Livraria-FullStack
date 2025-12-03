import { 
    criarUsuario, 
    listaUsuario, 
    obterUsuario, 
    atualizarUsuario, 
    deletarUsuario,
    loginUsuario} from "../controllers/usuarios.controller.js";

import express from "express"; 

// const express = require("express") // MESMA COISA QUE A LINHA DE CIMA

const router = express.Router();

router.post("/login", loginUsuario);

router.get("/", listaUsuario);
router.post("/", criarUsuario);
router.get("/:id", obterUsuario);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);

export default router;

