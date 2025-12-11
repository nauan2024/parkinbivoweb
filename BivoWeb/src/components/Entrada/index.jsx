import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputText } from "../inputtextcomponent"; 
import { api } from "../../services/api"; 
import "./style.css";

export const Entrada = () => {
  const navigate = useNavigate();
  const [placa, setPlaca] = useState("");
  const [modelo, setModelo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistrar = async (e) => {
    e.preventDefault();

    if (!placa || !modelo) {
      alert("Por favor, preencha a placa e o modelo.");
      return;
    }

    setLoading(true);

    const novoCarro = {
      placa: placa.toUpperCase(),
      modelo: modelo,
      horaEntrada: new Date().toLocaleString(),
      presenca: true,
      horaSaida: null
    };

    try {
      await api.registrarEntrada(novoCarro);
      
      alert("Veículo registrado com sucesso!");
      navigate("/home");
    } catch (error) {
      console.error(error); 
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