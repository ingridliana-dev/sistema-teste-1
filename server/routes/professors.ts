import { Router } from 'express';
import { supabase } from '../supabase';
import { z } from 'zod';

const router = Router();

// Schema para validação dos dados do professor
const professorSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  initials: z.string().min(1, "Sigla é obrigatória").max(5, "Sigla deve ter no máximo 5 caracteres"),
  active: z.number().min(0).max(1).default(1)
});

// Listar todos os professores
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .order('name');

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar professores:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar professores',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// Buscar um professor específico
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Professor não encontrado' });
    }

    res.json(data);
  } catch (error) {
    console.error('Erro ao buscar professor:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar professor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// Criar um novo professor
router.post('/', async (req, res) => {
  try {
    const validatedData = professorSchema.parse(req.body);
    
    // Converter as iniciais para maiúsculas
    validatedData.initials = validatedData.initials.toUpperCase();

    const { data, error } = await supabase
      .from('professionals')
      .insert([validatedData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        details: error.errors 
      });
    }

    console.error('Erro ao criar professor:', error);
    res.status(500).json({ 
      error: 'Erro ao criar professor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// Atualizar um professor
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const validatedData = professorSchema.parse(req.body);
    
    // Converter as iniciais para maiúsculas
    validatedData.initials = validatedData.initials.toUpperCase();

    const { data, error } = await supabase
      .from('professionals')
      .update(validatedData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ error: 'Professor não encontrado' });
    }

    res.json(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: 'Dados inválidos',
        details: error.errors 
      });
    }

    console.error('Erro ao atualizar professor:', error);
    res.status(500).json({ 
      error: 'Erro ao atualizar professor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// Excluir um professor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('professionals')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir professor:', error);
    res.status(500).json({ 
      error: 'Erro ao excluir professor',
      details: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

export { router as professorsRouter };
