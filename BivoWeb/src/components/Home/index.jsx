import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api"; 
import logo from "../../assets/imgs/logotipo-car.svg"; 
import "./style.css";

export const Home = () => {
  const navigate = useNavigate();
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const dados = await api.listarTudo();
    setVeiculos(dados);
  };

  const handleNovaEntrada = () => {
    navigate("/entrada"); 
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleSaidaRapida = async (idParaDeletar) => {
    if (confirm("Confirmar a saída e remover este veículo?")) {
      
      setVeiculos(listaAtual => 
        listaAtual.filter(carro => carro.id_carro !== idParaDeletar)
      );

      try {
        await api.registrarSaida(idParaDeletar);
      } catch (error) {
        alert("Erro de conexão. O carro pode reaparecer ao recarregar.");
        carregarDados(); 
      }
    }
  };

  return (
    <div className="home-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src={logo} alt="Bivô Logo" />
          <h2>Bivô Web</h2>
        </div>
        <nav className="sidebar-nav">
          <button className="nav-item active">🚗 Pátio Atual</button>
          <button className="nav-item">📄 Relatórios</button>
          <button className="nav-item">⚙️ Configurações</button>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout">
            Sair do Sistema
          </button>
        </div>
      </aside>

      <main className="content">
        <header className="top-bar">
          <div>
            <h1>Visão Geral</h1>
            <p className="subtitle">Gerencie os veículos estacionados</p>
          </div>
          <button onClick={handleNovaEntrada} className="btn-add">
            + Registrar Entrada
          </button>
        </header>

        <section className="cards-grid">
          {veiculos.length === 0 ? (
            <div className="empty-state">
              <p>O pátio está vazio.</p>
            </div>
          ) : (
            veiculos.map((carro) => (
              <div key={carro.id_carro} className="car-card">
                <div className="card-header">
                  <span className="placa">{carro.placa}</span>
                  <span className="badge-status">Estacionado</span>
                </div>
                
                <div className="card-body">
                  <div className="info-row">
                    <span>Modelo:</span>
                    <strong>{carro.modelo || "-"}</strong>
                  </div>
                  <div className="info-row">
                    <span>Entrada:</span>
                    <strong>{carro.horaEntrada || "Recente"}</strong>
                  </div>
                </div>

                <div className="card-footer">
                  <button 
                    onClick={() => handleSaidaRapida(carro.id_carro)} 
                    className="btn-action"
                  >
                    Registrar Saída
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};