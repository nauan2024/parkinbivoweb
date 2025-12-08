// Importe o hook de navegação
import { useNavigate } from 'react-router-dom'; 

import { InputText } from "../../components/inputtextcomponent";
import logo from "../../assets/imgs/logotipo-car.svg"; 
import "./style.css";

export const Login = () => {
  // 1. Crie a constante de navegação
  const navigate = useNavigate();

  // 2. Defina a função que o formulário chama
  const handleLogin = (e) => {
    e.preventDefault(); // Evita que a página recarregue
    console.log("Fazendo login...");
    
    // Aqui você navegaria para a Home
    navigate('/home'); 
  };

  return (
    <section className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Logo Bivô" className="logo" />
          <h2>Bem-vindo ao Bivô</h2>
          <p>Faça login para gerenciar o estacionamento</p>
        </div>

        {/* Agora a função handleLogin existe! */}
        <form onSubmit={handleLogin}>
          <InputText label="Usuário" placeholder="Digite seu usuário" />
          <InputText label="Senha" placeholder="Digite sua senha" type="password" />
          
          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>
      </div>
    </section>
  );
};