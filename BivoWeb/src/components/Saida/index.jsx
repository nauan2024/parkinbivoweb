import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../components/inputtextcomponent";
import { api } from "../../services/api"; 
import "./style.css";

export const Saida = () => {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");
  const [carroEncontrado, setCarroEncontrado] = useState(null);
  const [loading, setLoading] = useState(false);

  const buscarCarro = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
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

  const confirmarSaida = async () => {
    if (!carroEncontrado) return;

    try {
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