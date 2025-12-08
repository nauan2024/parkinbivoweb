import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../components/inputtextcomponent"; // Ajustei para InputText (PascalCase)
import { api } from "../../services/api"; // 1. Importação da API
import "./style.css";

export const Entrada = () => {
  const navigate = useNavigate();
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistrar = async (e) => {
    e.preventDefault();
    setLoading(true);

    // O objeto que será enviado
    const novoCarro = {
      placa: placa.toUpperCase(),
      modelo: modelo,
      horaEntrada: new Date().toLocaleString(),
      presenca: true,
      horaSaida: null
    };

    try {
      // 2. Chamada simplificada via API
      await api.registrarEntrada(novoCarro);
      
      alert("Veículo registrado com sucesso!");
      navigate("/home");
    } catch (error) {
      alert("Erro ao registrar veículo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h2>Registrar Entrada 🚙</h2>
        <form onSubmit={handleRegistrar}>
          <InputText 
            label="Placa do Veículo" 
            placeholder="ABC-1234" 
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            maxLength={8}
          />
          <InputText 
            label="Modelo / Cor" 
            placeholder="Ex: Fiat Uno Branco" 
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />

          <div className="button-group">
            <button type="button" onClick={() => navigate("/home")} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-confirm" disabled={loading}>
              {loading ? "Salvando..." : "Confirmar Entrada"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};