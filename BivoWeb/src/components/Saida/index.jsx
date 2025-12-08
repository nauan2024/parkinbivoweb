import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../components/inputtextcomponent";
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
      // MockAPI permite filtrar assim: ?placa=XXX
      const response = await fetch(`https://68ec4378eff9ad3b14019f4d.mockapi.io/carros?placa=${busca.toUpperCase()}`);
      const data = await response.json();

      if (data.length > 0) {
        setCarroEncontrado(data[0]); // Pega o primeiro que achar
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

  // 2. Função para efetivar a saída (PUT)
  const confirmarSaida = async () => {
    if (!carroEncontrado) return;

    try {
      const id = carroEncontrado.id;
      // Atualiza para presenca: false e define hora de saída
      await fetch(`https://68ec4378eff9ad3b14019f4d.mockapi.io/carros/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          presenca: false,
          horaSaida: new Date().toLocaleString()
        }),
      });

      alert("Saída registrada! O valor será calculado.");
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