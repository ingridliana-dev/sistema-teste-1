import { supabase } from './supabase';

// Função para verificar se o banco de dados está pronto
export async function checkDatabaseConnection() {
  try {
    const { error } = await supabase
      .from('professionals')
      .select('count(*)', { count: 'exact', head: true });

    if (error) {
      console.error('Erro ao conectar com o banco de dados:', error.message);
      return false;
    }

    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    return true;
  } catch (err) {
    console.error('Exceção ao testar conexão com o banco de dados:', err);
    return false;
  }
}

// Exporta o cliente do Supabase para ser usado como banco de dados
export const db = supabase;
