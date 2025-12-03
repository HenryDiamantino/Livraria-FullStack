import { db } from "../config/db.js"

// ============================
//  Rotas CRUD
// ============================

export async function criarReserva(req, res) {
    try {
        const { usuario_id, livro_id, confirmado_email } = req.body;
        if (!usuario_id || !livro_id || !confirmado_email)
            return res.status(400).json({ erro: "Campos obrigatórios" });

        await db.execute(
            "INSERT INTO retiradas (usuario_id, livro_id, confirmado_email) VALUES (?, ?, ?)",
            [usuario_id, livro_id, confirmado_email]
        );

        res.json({ mensagem: "Retirada feita com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function listarReservas(req, res) {
    try {
        const [rows] = await db.execute(`
        SELECT r.id, r.usuario_id, r.livro_id, u.nome, l.titulo, r.data_retirada, r.data_devolucao, r.confirmado_email, r.criado_em FROM reservas r
        LEFT JOIN usuarios u ON r.usuario_id = u.id
        LEFT JOIN livros l ON r.livro_id = l.id
        `);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function excluirReserva(req, res) {
    try {
        await db.execute("DELETE FROM reservas WHERE id = ?", [req.params.id]);
        res.json({ mensagem: "Reserva deletada com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};
