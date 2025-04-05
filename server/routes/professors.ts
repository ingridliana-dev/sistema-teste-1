import express from "express";
import { supabase } from "../supabase";

const router = express.Router();

// Listar todos os professores
router.get("/professors", async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from("professionals")
      .select("*")
      .order("name");

    if (error) throw error;

    res.json({ data: data || [] });
  } catch (error) {
    console.error("Erro ao buscar professores:", error);
    res.status(500).json({ 
      error: "Erro ao buscar professores",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Adicionar novo professor
router.post("/professors", async (req, res) => {
  try {
    const { name, initials, active } = req.body;

    // Validação básica
    if (!name || !initials) {
      return res.status(400).json({ 
        error: "Nome e iniciais são obrigatórios" 
      });
    }

    // Insere o professor
    const { data, error } = await supabase
      .from("professionals")
      .insert([
        { 
          name, 
          initials: initials.toUpperCase(),
          active: active ?? true
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ data });
  } catch (error) {
    console.error("Erro ao criar professor:", error);
    res.status(500).json({ 
      error: "Erro ao criar professor",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Atualizar professor
router.put("/professors/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, initials, active } = req.body;

    // Validação básica
    if (!name || !initials) {
      return res.status(400).json({ 
        error: "Nome e iniciais são obrigatórios" 
      });
    }

    // Atualiza o professor
    const { data, error } = await supabase
      .from("professionals")
      .update({ 
        name, 
        initials: initials.toUpperCase(),
        active
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json({ data });
  } catch (error) {
    console.error("Erro ao atualizar professor:", error);
    res.status(500).json({ 
      error: "Erro ao atualizar professor",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Excluir professor
router.delete("/professors/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("professionals")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error("Erro ao excluir professor:", error);
    res.status(500).json({ 
      error: "Erro ao excluir professor",
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

export const professorsRouter = router;
