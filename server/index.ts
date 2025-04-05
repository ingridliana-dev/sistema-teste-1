import express from 'express';
import cors from 'cors';
import { professorsRouter } from './routes/professors';
import { supabase } from './supabase';

// Configuração do servidor Express
const app = express();
const port = process.env.PORT || 3002; // Mudando para porta 3002

// Middleware para CORS
app.use(cors({
  origin: '*' // Permite todas as origens em desenvolvimento
}));

// Middleware para processar JSON
app.use(express.json());

// Rotas da API
app.use('/api/professors', professorsRouter);

// Rota de teste
app.get('/api/test', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

// Testar conexão com o Supabase antes de iniciar o servidor
async function initServer() {
  try {
    // Testar a conexão com o Supabase
    const { data, error } = await supabase.from('professionals').select('*').limit(1);
    
    if (error) {
      throw error;
    }

    console.log('Conexão com o Supabase estabelecida com sucesso!');
    
    // Iniciar o servidor
    app.listen(port, () => {
      console.log(`Servidor está rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao conectar com o Supabase:', error);
    process.exit(1);
  }
}

// Iniciar o servidor
initServer();
