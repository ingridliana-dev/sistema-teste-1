import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase com service_role key para ter acesso total
const supabaseUrl = process.env.SUPABASE_URL || 'https://rqqgohsjogdkesxtlvbn.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxcWdvaHNqb2dka2VzeHRsdmJuIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Mzg4MTQ5NCwiZXhwIjoyMDU5NDU3NDk0fQ.CH3R1gRAZzI3lZULLJdzyDtt9f7xJTgZ6lAjEQ1khl8';

// Verificação para garantir que as variáveis de ambiente estão configuradas
if (!supabaseUrl || !supabaseKey) {
  console.error('Erro: As variáveis de ambiente SUPABASE_URL e SUPABASE_KEY devem ser configuradas.');
  console.error('Valores atuais:', { 
    SUPABASE_URL: supabaseUrl || 'não definido',
    SUPABASE_KEY: supabaseKey ? 'definido' : 'não definido'
  });
  process.exit(1);
}

console.log('Configurando Supabase com:', { 
  url: supabaseUrl,
  keyLength: supabaseKey.length,
  keyStart: supabaseKey.substring(0, 10),
  keyEnd: supabaseKey.substring(supabaseKey.length - 10)
});

// Criando o cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  },
  db: {
    schema: 'public'
  }
});
