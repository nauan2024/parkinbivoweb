const API_URL = 'https://68ec4378eff9ad3b14019f4d.mockapi.io/carros';

export const api = {
    // 1. LISTAR (GET)
    listarTudo: async () => {
        try {
            const response = await fetch(API_URL);
            return await response.json();
        } catch (error) {
            console.error("Erro ao listar:", error);
            return [];
        }
    },

    // 2. BUSCAR POR PLACA (GET com filtro)
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

    // 3. REGISTRAR ENTRADA (POST)
    registrarEntrada: async (dadosCarro) => {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosCarro)
        });
    },

    // 4. REGISTRAR SAÍDA (DELETE) - Isso apaga do Banco de Dados
    registrarSaida: async (id) => {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE' 
        });
    }
};