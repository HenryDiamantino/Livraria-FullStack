SELECT * FROM avaliacoes a
INNER JOIN usuarios u ON a.usuario_id = u.id


SELECT a.id, u.nome, l.titulo, a.nota, a.comentario FROM avaliacoes a
INNER JOIN usuarios u ON a.usuario_id = u.id
INNER JOIN livros l ON a.livro_id = l.id



SELECT f.id, f.usuario_id, u.nome, l.titulo, f.data_favoritado FROM favoritos f
LEFT JOIN usuarios u ON f.usuario_id = u.id
LEFT JOIN livros l ON f.livro_id = l.id


SELECT r.id, r.usuario_id, r.livro_id, u.nome, l.titulo, r.data_retirada, r.data_devolucao, r.confirmado_email, r.criado_em FROM reservas r
LEFT JOIN usuarios u ON r.usuario_id = u.id
LEFT JOIN livros l ON r.livro_id = l.id