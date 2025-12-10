const API_URL = 'https://68ec4378eff9ad3b14019f4d.mockapi.io/carros';

export const api = {
    listarTudo: async () => {
        try {
            const response = await fetch(API_URL);
            return await response.json();
        } catch (error) {
            console.error("Erro ao listar:", error);
            return [];
        }
    },

    buscarPorPlaca: async (placa) => {
        try {
            const response = await fetch(`${API_URL}?placa=${placa}`);
            const dados = await response.json();
            return dados.length > 0 ? dados[0] : null;
        } catch (error) {
            console.error("Erro na busca:", error);
            return null;
        }
    },

    registrarEntrada: async (dadosCarro) => {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosCarro)
        });
    },

    registrarSaida: async (id) => {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE' 
        });
    }
};