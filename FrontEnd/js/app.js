function processarRecuperacao(event) {
    // Se o formulário passar na validação 'required', este código é executado
    // Para enviar dados via AJAX, use event.preventDefault();
    // Exemplo para redirecionar após a validação:
    window.location.href = 'redefinindo.html';
    // Opcional: Se quiser evitar o envio do formulário padrão (se for usar AJAX), use:
    // event.preventDefault();
    return false; // Evita o envio padrão do formulário após o JS
}

function togglePassword(id) {
    const passwordInput = document.getElementById(id);

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// js/app.js (Exemplo de código)

// 1. Espera o DOM ser totalmente carregado
document.addEventListener('DOMContentLoaded', () => {

    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        // 2. Adiciona um "ouvinte" de evento para quando o formulário for submetido
        loginForm.addEventListener('submit', async (e) => {
            // 3. Previne o comportamento padrão (recarregar a página)
            e.preventDefault();

            // 4. Pega os valores dos campos
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // 5. O URL base do seu Back-End (localhost:3000)
            const apiUrl = 'http://localhost:3000/usuarios'; // Ajuste a rota se necessário

            try {
                // 6. Faz a requisição POST usando Fetch
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // 7. Envia os dados em formato JSON
                    body: JSON.stringify({ email, senha: password }),
                });

                // 8. Processa a resposta
                if (response.ok) {
                    const data = await response.json();
                    alert('Login bem-sucedido! Bem-vindo(a), ' + data.nome);
                    // Aqui você redirecionaria o usuário: window.location.href = '/index.html';
                } else {
                    // Pega a mensagem de erro do servidor, se houver
                    const error = await response.json();
                    alert('Erro no login: ' + error.message);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
                alert('Ocorreu um erro ao tentar conectar com o servidor.');
            }
        });
    }

    // Você repetiria um processo semelhante para o formulário de cadastro (cadastro.html)
    // Usando um método POST para a rota POST /usuarios
});


// js/app.js (Exemplo de Código para o Cadastro)

document.addEventListener('DOMContentLoaded', () => {

    const cadastroForm = document.getElementById('cadastroForm');
    // Você precisa adicionar o id="cadastroForm" na sua tag <form> em cadastro.html

    if (cadastroForm) {
        cadastroForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Impede o envio padrão do formulário e o recarregamento da página

            // 1. Coletar os valores dos campos
            const nome = document.getElementById('nome').value;
            const sobrenome = document.getElementById('sobrenome').value;
            const email = document.getElementById('email').value;
            const telefone = document.getElementById('telefone').value;
            const dataNascimento = document.getElementById('data-nascimento').value;
            const senha = document.getElementById('senha').value;
            const confirmarSenha = document.getElementById('confirmar-senha').value;
            const termos = document.getElementById('termos').checked;

            // ⚠️ Validação no Front-End
            if (senha !== confirmarSenha) {
                alert('As senhas não coincidem!');
                return;
            }
            if (!termos) {
                alert('Você deve aceitar os Termos de Uso.');
                return;
            }

            // 2. Montar o objeto de dados a ser enviado
            const novoUsuario = {
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                telefone: telefone,
                dataNascimento: dataNascimento,
                // O nome do campo de senha no back-end pode ser "senha"
                senha: senha
            };

            // 3. Endpoint do Back-End (Rota de Criação: POST /usuarios)
            const apiUrl = 'http://localhost:3000/usuarios';

            try {
                // 4. Enviar a requisição POST
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(novoUsuario),
                });

                // 5. Tratar a Resposta
                if (response.ok) {
                    // Cadastro bem-sucedido (Status 200/201)
                    const data = await response.json();
                    alert('Cadastro realizado com sucesso! Faça login agora.');
                    // Redireciona para a página de login
                    window.location.href = 'login.html';
                } else {
                    // Erro (Status 4xx/5xx)
                    const error = await response.json();
                    alert('Falha no cadastro: ' + (error.message || 'Erro desconhecido.'));
                }
            } catch (error) {
                console.error('Erro na requisição de cadastro:', error);
                alert('Não foi possível conectar ao servidor. Verifique se o Back-End está rodando.');
            }
        });
    }
});