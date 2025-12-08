import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api"; 
import logo from "../../assets/imgs/logotipo-car.svg"; 
import "./style.css";

export const Home = () => {
  const navigate = useNavigate();
  const [veiculos, setVeiculos] = useState([]);

  // Carrega os dados assim que a tela abre
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

  // --- FUNÇÃO DE SAÍDA CORRIGIDA (id -> id_carro) ---
  const handleSaidaRapida = async (idParaDeletar) => {
    // 1. Pergunta se quer mesmo excluir
    if (confirm("Confirmar a saída e remover este veículo?")) {
      
      // 2. ATUALIZAÇÃO VISUAL: Remove o card da tela IMEDIATAMENTE
      // CORREÇÃO: Usamos 'id_carro' para filtrar, pois 'id' não existe
      setVeiculos(listaAtual => 
        listaAtual.filter(carro => carro.id_carro !== idParaDeletar)
      );

      try {
        // 3. ATUALIZAÇÃO DO BANCO: Manda apagar na API
        await api.registrarSaida(idParaDeletar);
      } catch (error) {
        alert("Erro de conexão. O carro pode reaparecer ao recarregar.");
        // Se der erro, recarrega a lista original
        carregarDados(); 
      }
    }
  };

  return (
    <div className="home-layout">
      {/* Sidebar */}
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

      {/* Conteúdo Principal */}
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
              // CORREÇÃO: A key agora usa o id_carro
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
                  {/* CORREÇÃO: Passamos o id_carro para a função de deletar */}
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