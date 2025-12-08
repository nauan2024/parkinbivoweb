import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../components/inputtextcomponent";
import { api } from "../../services/api"; // 1. Importando a API central
import "./style.css";

export const Saida = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [carroEncontrado, setCarroEncontrado] = useState(null);
  const [loading, setLoading] = useState(false);

  // 1. Função para achar o carro pela placa
  const buscarCarro = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Substituído: Fetch manual -> Chamada da API
      // A função buscarPorPlaca já retorna o objeto do carro ou null
      const carro = await api.buscarPorPlaca(busca.toUpperCase());

      if (carro) {
        setCarroEncontrado(carro);
      } else {
        alert("Veículo não encontrado ou placa incorreta.");
        setCarroEncontrado(null);
      }
    } catch (error) {
      alert("Erro na busca.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Função para efetivar a saída
  const confirmarSaida = async () => {
    if (!carroEncontrado) return;

    try {
      // Substituído: Fetch PUT manual -> Chamada da API
      // O arquivo api.js cuida se vai deletar ou atualizar a data
      await api.registrarSaida(carroEncontrado.id);

      alert("Saída registrada com sucesso!");
      navigate("/home");
    } catch (error) {
      alert("Erro ao registrar saída.");
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2>Registrar Saída 🏁</h2>
        
        {/* Formulário de Busca */}
        <form onSubmit={buscarCarro} className="search-box">
          <InputText 
            label="Buscar Placa" 
            placeholder="Digite a placa..." 
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
          <button type="submit" className="btn-search" disabled={loading}>
            🔍 Buscar
          </button>
        </form>

        {/* Se achou o carro, mostra os detalhes */}
        {carroEncontrado && (
          <div className="result-card">
            <h3>Veículo Encontrado:</h3>
            <p><strong>Modelo:</strong> {carroEncontrado.modelo}</p>
            <p><strong>Entrada:</strong> {carroEncontrado.horaEntrada}</p>
            
            <button onClick={confirmarSaida} className="btn-finish">
              Confirmar Pagamento e Saída
            </button>
          </div>
        )}

        <button onClick={() => navigate("/home")} className="btn-back">
          Voltar ao Pátio
        </button>
      </div>
    </div>
  );
};