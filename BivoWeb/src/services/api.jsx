// src/services/api.js

const API_URL = 'https://68ec4378eff9ad3b14019f4d.mockapi.io/carros';

export const api = {
    // 1. LISTAR TODOS (Para a Home/Dashboard)
    listarTudo: async () => {
        try {
            const response = await fetch(API_URL);
            return await response.json();
        } catch (error) {
            console.error("Erro ao listar:", error);
            throw error;
        }
    },

    // 2. BUSCAR POR PLACA (Para a tela de Saída)
    // O MockAPI filtra assim: /carros?placa=XYZ
    buscarPorPlaca: async (placa) => {
        try {
            const response = await fetch(`${API_URL}?placa=${placa}`);
            const dados = await response.json();
            // Retorna o primeiro item ou null se não achar
            return dados.length > 0 ? dados[0] : null; 
        } catch (error) {
            console.error("Erro ao buscar placa:", error);
            throw error;
        }
    },

    // 3. REGISTRAR ENTRADA (Para a tela de Entrada)
    registrarEntrada: async (dadosCarro) => {
        // dadosCarro deve ser um objeto: { placa: "ABC", modelo: "Fusca", horaEntrada: "..." }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosCarro)
            });
            return await response.json();
        } catch (error) {
            console.error("Erro ao registrar:", error);
            throw error;
        }
    },

    // 4. REGISTRAR SAÍDA (Para finalizar/pagar)
    // Atualiza o registro (ex: adiciona horaSaida e valorPago) ou deleta, dependendo da sua regra.
    // Aqui fiz como DELETE (o carro sai do pátio), mas poderia ser PUT.
    registrarSaida: async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });
            return response.ok;
        } catch (error) {
            console.error("Erro na saída:", error);
            throw error;
        }
    }
};