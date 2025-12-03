import { db } from "../config/db.js"
import bcrypt from 'bcrypt';

// ============================
//  Rotas CRUD
// ============================

// controllers/usuarios.controller.js

// ... Importações (Seu modelo de usuário, bcrypt, etc.) ...

// A função 'criarUsuario' que já deve existir:
const criarUsuario = async (req, res) => {
    // 1. Desestruturar os dados enviados do Front-End
    const {
        nome,
        sobrenome,
        email,
        telefone,
        dataNascimento,
        senha
    } = req.body;

    // ⚠️ Adicione uma validação básica para garantir que todos os campos obrigatórios vieram
    if (!email || !senha || !nome) {
        return res.status(400).json({ message: "Dados incompletos." });
    }

    try {
        // --- 🔒 Lógica de Segurança e Banco de Dados ---

        const salt = await bcrypt.genSalt(10);

        // Exemplo: Criptografar a senha
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        // Exemplo: Salvar no banco de dados
        const novoUsuario = await SeuModeloDeUsuario.create({
            nome,
            sobrenome,
            email,
            telefone,
            dataNascimento,
            senha: senhaCriptografada // Salve a senha criptografada!
        });

        // --- Fim da Lógica ---

        // await db.execute(
        //     "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
        //     [nome, email, senha]
        // );

        // 2. Resposta de Sucesso (Status 201 Created)
        return res.status(201).json({
            message: "Usuário cadastrado com sucesso!",
            email: email
        });
    } catch (error) {
        // Se houver erro de duplicidade de e-mail (ou outro erro do banco)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ message: "Este e-mail já está em uso." });
        }

        console.error("Erro ao criar usuário:", error);
        return res.status(500).json({ message: "Erro interno do servidor." });
    }
};

// ... O restante das suas funções ...

// Garanta que você está EXPORTANDO a função no final do arquivo:
export {
    criarUsuario,
    // ... todas as outras funções (listaUsuario, obterUsuario, etc.) ...
};


export async function listaUsuario(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM usuarios");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function obterUsuario(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM usuarios WHERE id = ?", [
            req.params.id,
        ]);
        if (rows.length === 0)
            return res.status(404).json({ erro: "Usuário não encontrado" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function atualizarUsuario(req, res) {
    try {
        const { nome, email, senha } = req.body;
        await db.execute(
            "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?",
            [nome, email, senha, req.params.id]
        );
        res.json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function deletarUsuario(req, res) {
    try {
        await db.execute("DELETE FROM usuarios WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Usuário deletado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


// Exemplo Conceitual: controllers/usuarios.controller.js

// ... outras funções (criarUsuario, listaUsuario, etc.) ...

const loginUsuario = async (req, res) => {
    try {
        const { email, senha } = req.body;

        // 1. Busque o usuário no banco de dados pelo email
        const usuario = await usuario.findOne({ where: { email } });

        // 2. Verifique se o usuário existe e se a senha está correta
        if (!usuario || !bcrypt.compareSync(senha, usuario.senha)) {
            return res.status(401).json({ message: "Email ou senha inválidos." });
        }

        // 3. Se tudo estiver correto, envie uma resposta de sucesso (e talvez um token JWT)
        return res.status(200).json({
            message: "Login bem-sucedido!",
            token: 'SEU_TOKEN_AQUI'
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro interno no servidor." });
    }
};

export {
    loginUsuario
};