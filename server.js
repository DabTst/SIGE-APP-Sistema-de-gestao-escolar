const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dados em memória (para simulação)
let alunos = [];

// Rotas
// Registrar alunos
app.post("/alunos", (req, res) => {
  const { nome, classe } = req.body;
  if (!nome || !classe) {
    return res.status(400).json({ message: "Nome e classe são obrigatórios!" });
  }
  const aluno = {
    id: alunos.length + 1,
    nome,
    classe,
    notas: { nota1: 0, nota2: 0, nota3: 0, media: 0 },
    exame: 0,
  };
  alunos.push(aluno);
  res.status(201).json(aluno);
});

// Listar alunos por classe
app.get("/alunos/:classe", (req, res) => {
  const { classe } = req.params;
  const alunosDaClasse = alunos.filter((aluno) => aluno.classe === classe);
  res.json(alunosDaClasse);
});

// Atualizar notas
app.put("/alunos/:id/notas", (req, res) => {
  const { id } = req.params;
  const { nota1, nota2, nota3 } = req.body;
  const aluno = alunos.find((a) => a.id === parseInt(id));
  if (!aluno) return res.status(404).json({ message: "Aluno não encontrado!" });

  aluno.notas.nota1 = nota1 || aluno.notas.nota1;
  aluno.notas.nota2 = nota2 || aluno.notas.nota2;
  aluno.notas.nota3 = nota3 || aluno.notas.nota3;
  aluno.notas.media = (
    (aluno.notas.nota1 + aluno.notas.nota2 + aluno.notas.nota3) /
    3
  ).toFixed(2);

  res.json(aluno);
});

// Atualizar nota do exame
app.put("/alunos/:id/exame", (req, res) => {
  const { id } = req.params;
  const { exame } = req.body;
  const aluno = alunos.find((a) => a.id === parseInt(id));
  if (!aluno) return res.status(404).json({ message: "Aluno não encontrado!" });

  aluno.exame = exame;
  res.json(aluno);
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
