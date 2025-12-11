import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './style.css';

export const Cadastro_login = () => {
  const navigate = useNavigate(); 
  const API_URL = "https://68ec4378eff9ad3b14019f4d.mockapi.io/Usuarios";

  const [isLoginView, setIsLoginView] = useState(true); 

  const [mensagem, setMensagem] = useState({ texto: '', tipo: '' });
  const [carregando, setCarregando] = useState(false);

  const [formLogin, setFormLogin] = useState({ email: '', senha: '' });
  const [formCadastro, setFormCadastro] = useState({ nome: '', email: '', senha: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setMensagem({});
    setCarregando(true);

    try {
      const response = await fetch(`${API_URL}?Email=${formLogin.email}`);
      const dados = await response.json();
      
      const usuarioEncontrado = dados[0];

      if (usuarioEncontrado) {
        if (usuarioEncontrado.Senha === formLogin.senha) {
          setMensagem({ texto: 'Login realizado! Entrando...', tipo: 'sucesso' });
          
          localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));

          setTimeout(() => {
            navigate('/home'); 
          }, 1000);

        } else {
          setMensagem({ texto: 'Senha incorreta.', tipo: 'erro' });
        }
      } else {
        setMensagem({ texto: 'E-mail não encontrado.', tipo: 'erro' });
      }
    } catch (error) {
      console.error(error);
      setMensagem({ texto: 'Erro ao conectar com a API.', tipo: 'erro' });
    } finally {
      setCarregando(false);
    }
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    if (!formCadastro.nome || !formCadastro.email || !formCadastro.senha) {
      setMensagem({ texto: 'Preencha todos os campos.', tipo: 'erro' });
      return;
    }

    setCarregando(true);
    setMensagem({ texto: 'Validando dados...', tipo: '' });

    try {
      const checkRes = await fetch(`${API_URL}?Email=${formCadastro.email}`);
      const checkData = await checkRes.json();

      console.log("Resposta da API ao verificar email:", checkData);

     
      if (Array.isArray(checkData)) {
        
        const usuarioJaExiste = checkData.find(user => user.Email === formCadastro.email);

        if (usuarioJaExiste) {
          setMensagem({ texto: 'Este e-mail já possui conta.', tipo: 'erro' });
          setCarregando(false);
          return;
        }
      } 

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Nome: formCadastro.nome,
          Email: formCadastro.email,
          Senha: formCadastro.senha
        })
      });

      if (response.ok) {
        setMensagem({ texto: 'Conta criada! Faça login.', tipo: 'sucesso' });
        setTimeout(() => {
          setFormCadastro({ nome: '', email: '', senha: '' });
          setIsLoginView(true);
          setMensagem({});
        }, 1500);
      } else {
        setMensagem({ texto: 'Erro ao salvar o cadastro.', tipo: 'erro' });
      }

    } catch (error) {
      console.error("Erro Técnico:", error);
      setMensagem({ texto: `Erro: ${error.message}`, tipo: 'erro' });
    } finally {
      setCarregando(false);
    }
  };
  return (
    <div className="cadastro-container">
      <div className="card">
        
        {isLoginView ? (
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
                {carregando ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
            <div className="toggle-link">
              Não tem conta? <span onClick={() => { setIsLoginView(false); setMensagem({}); }}>Cadastre-se</span>
            </div>
          </div>
        ) : (
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
              Já tem conta? <span onClick={() => { setIsLoginView(true); setMensagem({}); }}>Voltar para Login</span>
            </div>
          </div>
        )}

        {mensagem.texto && (
          <p className={`mensagem ${mensagem.tipo}`}>{mensagem.texto}</p>
        )}

      </div>
    </div>
  );
}