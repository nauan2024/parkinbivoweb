import React, { useState } from 'react';
import './style.css';

export default function Cadastro() {
  // --- SUA API OFICIAL (MOCKAPI) ---
  const API_URL = "https://68ec4378eff9ad3b14019f4d.mockapi.io/Usuarios";

  // Estados de navegação e usuário
  const [telaAtual, setTelaAtual] = useState('login'); // 'login', 'cadastro' ou 'home'
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  
  // Estados de feedback (mensagens e carregamento)
  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [carregando, setCarregando] = useState(false);

  // Estados dos formulários
  const [formLogin, setFormLogin] = useState({ email: '', senha: '' });
  const [formCadastro, setFormCadastro] = useState({ nome: '', email: '', senha: '' });

  // --- FUNÇÃO 1: FAZER LOGIN (GET) ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem({}); 
    setCarregando(true);

    try {
      // Busca na API usuarios com esse email
      const response = await fetch(`${API_URL}?Email=${formLogin.email}`);
      const dados = await response.json();

      // O MockAPI retorna uma lista (array). Pegamos o primeiro item se existir.
      const usuarioEncontrado = dados[0];

      if (usuarioEncontrado) {
        // Valida se a senha bate
        if (usuarioEncontrado.Senha === formLogin.senha) {
          setMensagem({ texto: 'Login realizado com sucesso!', tipo: 'sucesso' });
          setUsuarioLogado(usuarioEncontrado);
          
          // Aguarda 1 segundo e entra na Home
          setTimeout(() => {
            setTelaAtual('home');
            setMensagem({});
          }, 1000);
        } else {
          setMensagem({ texto: 'Senha incorreta.', tipo: 'erro' });
        }
      } else {
        setMensagem({ texto: 'E-mail não encontrado.', tipo: 'erro' });
      }

    } catch (error) {
      console.error("Erro login:", error);
      setMensagem({ texto: 'Erro de conexão com a API.', tipo: 'erro' });
    } finally {
      setCarregando(false);
    }
  };

  // --- FUNÇÃO 2: CADASTRAR NOVO (POST) ---
  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!formCadastro.nome || !formCadastro.email || !formCadastro.senha) {
      setMensagem({ texto: 'Preencha todos os campos.', tipo: 'erro' });
      return;
    }

    setCarregando(true);
    setMensagem({ texto: 'Verificando disponibilidade...', tipo: '' });

    try {
      // Passo A: Verifica se o email já existe
      const checkRes = await fetch(`${API_URL}?Email=${formCadastro.email}`);
      const checkData = await checkRes.json();

      if (checkData.length > 0) {
        setMensagem({ texto: 'Este e-mail já possui conta.', tipo: 'erro' });
        setCarregando(false);
        return;
      }

      // Passo B: Cria o objeto do usuário
      const novoUsuario = {
        Nome: formCadastro.nome,
        Email: formCadastro.email,
        Senha: formCadastro.senha
      };

      // Passo C: Envia para a API (POST)
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario)
      });

      if (response.ok) {
        setMensagem({ texto: 'Conta criada! Redirecionando para login...', tipo: 'sucesso' });
        
        // Limpa e volta para login após 2 segundos
        setTimeout(() => {
          setFormCadastro({ nome: '', email: '', senha: '' });
          setTelaAtual('login');
          setMensagem({});
        }, 2000);
      } else {
        setMensagem({ texto: 'Erro ao salvar na API.', tipo: 'erro' });
      }

    } catch (error) {
      console.error("Erro cadastro:", error);
      setMensagem({ texto: 'Erro de conexão.', tipo: 'erro' });
    } finally {
      setCarregando(false);
    }
  };

  // Função para sair (Logout)
  const handleLogout = () => {
    setUsuarioLogado(null);
    setFormLogin({ email: '', senha: '' });
    setTelaAtual('login');
  };

  // --- O QUE APARECE NA TELA (JSX) ---
  return (
    <div className="cadastro-container">
      <div className="card">
        
        {/* TELA DE LOGIN */}
        {telaAtual === 'login' && (
          <div className="fade-in">
            <h2>Acessar Sistema</h2>
            <form onSubmit={handleLogin}>
              <input 
                type="email" 
                placeholder="E-mail" 
                value={formLogin.email}
                onChange={(e) => setFormLogin({...formLogin, email: e.target.value})}
                required 
              />
              <input 
                type="password" 
                placeholder="Senha" 
                value={formLogin.senha}
                onChange={(e) => setFormLogin({...formLogin, senha: e.target.value})}
                required 
              />
              <button type="submit" disabled={carregando}>
                {carregando ? 'Carregando...' : 'Entrar'}
              </button>
            </form>
            <div className="toggle-link">
              Não tem conta? <span onClick={() => { setTelaAtual('cadastro'); setMensagem({}); }}>Cadastre-se</span>
            </div>
          </div>
        )}

        {/* TELA DE CADASTRO */}
        {telaAtual === 'cadastro' && (
          <div className="fade-in">
            <h2>Novo Cadastro</h2>
            <form onSubmit={handleCadastro}>
              <input 
                type="text" 
                placeholder="Nome Completo" 
                value={formCadastro.nome}
                onChange={(e) => setFormCadastro({...formCadastro, nome: e.target.value})}
                required 
              />
              <input 
                type="email" 
                placeholder="E-mail" 
                value={formCadastro.email}
                onChange={(e) => setFormCadastro({...formCadastro, email: e.target.value})}
                required 
              />
              <input 
                type="password" 
                placeholder="Senha" 
                value={formCadastro.senha}
                onChange={(e) => setFormCadastro({...formCadastro, senha: e.target.value})}
                required 
              />
              <button type="submit" disabled={carregando}>
                {carregando ? 'Salvando...' : 'Cadastrar'}
              </button>
            </form>
            <div className="toggle-link">
              Já tem conta? <span onClick={() => { setTelaAtual('login'); setMensagem({}); }}>Voltar para Login</span>
            </div>
          </div>
        )}

        {/* TELA HOME (ÁREA RESTRITA) */}
        {telaAtual === 'home' && usuarioLogado && (
          <div className="fade-in">
            <h2>Bem-vindo(a)!</h2>
            <div className="user-info">
              <p>Olá, <strong>{usuarioLogado.Nome}</strong>.</p>
              <p>Você está conectado à API MockAPI.</p>
              <small>ID do Usuário: {usuarioLogado.id}</small>
            </div>
            <button className="btn-danger" onClick={handleLogout}>Sair do Sistema</button>
          </div>
        )}

        {/* MENSAGENS DE AVISO */}
        {mensagem.texto && (
          <p className={`mensagem ${mensagem.tipo}`}>{mensagem.texto}</p>
        )}

      </div>
    </div>
  );
}