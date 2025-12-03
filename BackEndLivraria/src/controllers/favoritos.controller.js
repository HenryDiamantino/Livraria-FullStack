import { db } from "../config/db.js"

// ============================
//  Rotas CRUD
// ============================

export async function criarFavorito(req, res) {
    try {
        const { usuario_id, livro_id, data_favoritado } = req.body;
        if (!usuario_id || !livro_id || !data_favoritado)
            return res.status(400).json({ erro: "Campos obrigatórios" });

        await db.execute(
            "INSERT INTO favoritos (usuario_id, livro_id, data_favoritado) VALUES (?, ?, ?)",
            [usuario_id, livro_id, data_favoritado]
        );

        res.json({ mensagem: "Favoritado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function listarFavoritos(req, res) {
    try {
        const [rows] = await db.execute(`
        SELECT f.id, f.usuario_id, u.nome, l.titulo, f.data_favoritado FROM favoritos f 
        LEFT JOIN usuarios u ON f.usuario_id = u.id 
        LEFT JOIN livros l ON f.livro_id = l.id
        `);
        
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function excluirFavorito(req, res) {
    try {
        await db.execute("DELETE FROM favoritos WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Livro removido dos favoritos com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};