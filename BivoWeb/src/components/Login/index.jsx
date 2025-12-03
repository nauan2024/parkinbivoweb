import { useNavigate } from "react-dom";
import { InputText } from "../../components/inputtextcomponent";
import logo from "../../assets/imgs/logotipo-car.svg"; // Verifique se o caminho bate com sua pasta
import "./style.css";

export const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui viria a lógica de autenticação
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