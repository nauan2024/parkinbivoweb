import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/imgs/logotipo-car.svg"; // Use o seu logo aqui
import "./style.css";

export const Home = () => {
  const navigate = useNavigate();

  // Dados fictícios para simular a API
  const [veiculos, setVeiculos] = useState([
    { id: 1, placa: "BRA-2E19", modelo: "Fiat Mobi", entrada: "08:30" },
    { id: 2, placa: "RJX-9988", modelo: "Honda Civic", entrada: "09:15" },
    { id: 3, placa: "GOL-1234", modelo: "VW Gol", entrada: "10:00" },
  ]);

  // Função para simular o Logout
  const handleLogout = () => {
    navigate("/");
  };

  // Função para simular a Saída (Remover card)
  const handleSaida = (id) => {
    const novaLista = veiculos.filter((carro) => carro.id !== id);
    setVeiculos(novaLista);
  };

  // Função para simular Entrada (Adicionar card aleatório)
  const handleNovaEntrada = () => {
    const novoCarro = {
      id: Math.random(),
      placa: "NEW-" + Math.floor(Math.random() * 9999),
      modelo: "Veículo Teste",
      entrada: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setVeiculos([...veiculos, novoCarro]);
  };

  return (
    <div className="home-layout">
      {/* --- MENU LATERAL (SIDEBAR) --- */}
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

      {/* --- CONTEÚDO PRINCIPAL --- */}
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

        {/* --- GRID DE CARDS --- */}
        <section className="cards-grid">
          {veiculos.length === 0 ? (
            <div className="empty-state">
              <p>O pátio está vazio no momento.</p>
            </div>
          ) : (
            veiculos.map((carro) => (
              <div key={carro.id} className="car-card">
                <div className="card-header">
                  <span className="placa">{carro.placa}</span>
                  <span className="badge-status">Estacionado</span>
                </div>
                
                <div className="card-body">
                  <div className="info-row">
                    <span>Modelo:</span>
                    <strong>{carro.modelo}</strong>
                  </div>
                  <div className="info-row">
                    <span>Entrada:</span>
                    <strong>{carro.entrada}</strong>
                  </div>
                </div>

                <div className="card-footer">
                  <button 
                    onClick={() => handleSaida(carro.id)} 
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