import React, { useState, useEffect } from "react";
import axios from "axios";

const TeacherDash = () => {
  const [classe, setClasse] = useState("");
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    if (classe) {
      axios
        .get(`http://localhost:5000/alunos/${classe}`)
        .then((res) => setAlunos(res.data))
        .catch((err) => console.error(err));
    }
  }, [classe]);

  const updateNotas = (id, nota1, nota2, nota3) => {
    axios
      .put(`http://localhost:5000/alunos/${id}/notas`, { nota1, nota2, nota3 })
      .then(() => {
        // Atualiza localmente
        setAlunos((prev) =>
          prev.map((aluno) =>
            aluno.id === id
              ? {
                  ...aluno,
                  notas: {
                    nota1,
                    nota2,
                    nota3,
                    media: ((nota1 + nota2 + nota3) / 3).toFixed(2),
                  },
                }
              : aluno
          )
        );
      })
      .catch((err) => console.error(err));
  };


  return (
    <div>
      <h1>Dashboard do Professor</h1>
      <select onChange={(e) => setClasse(e.target.value)}>
        <option value="">Selecione uma classe</option>
        <option value="10A">10A</option>
        <option value="10B">10B</option>
        {/* Adicione mais classes conforme necessário */}
      </select>
      {alunos.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Nota 1</th>
              <th>Nota 2</th>
              <th>Nota 3</th>
              <th>Média</th>
              <th>Exame</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>{aluno.nome}</td>
                <td>
                  <input
                    type="number"
                    value={aluno.notas.nota1}
                    onChange={(e) =>
                      updateNotas(
                        aluno.id,
                        parseFloat(e.target.value),
                        aluno.notas.nota2,
                        aluno.notas.nota3
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={aluno.notas.nota2}
                    onChange={(e) =>
                      updateNotas(
                        aluno.id,
                        aluno.notas.nota1,
                        parseFloat(e.target.value),
                        aluno.notas.nota3
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={aluno.notas.nota3}
                    onChange={(e) =>
                      updateNotas(
                        aluno.id,
                        aluno.notas.nota1,
                        aluno.notas.nota2,
                        parseFloat(e.target.value)
                      )
                    }
                  />
                </td>
                <td>{aluno.notas.media}</td>
                <td>
                  <input
                    type="number"
                    value={aluno.exame}
                    onChange={(e) =>
                      axios.put(
                        `http://localhost:5000/alunos/${aluno.id}/exame`,
                        { exame: parseFloat(e.target.value) }
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
/*=> {
  return (
    <div className="dashboard teacher-dashboard">
      <h1>Bem vindo ao seu painel de controle, Caro Professor</h1>

      <div className="section">
        <h2>Gerenciar Notas</h2>
        <button>Adicionar Notas</button>
      </div>
      <div className="section">
        <h2>Exames</h2>
        <button>Adicionar Notas</button>
      </div>

      <div className="section">
        <h2>Frequência</h2>
        <button>Registrar frequência</button>
      </div>

      <div className="section">
        <h2>Desempenho de Alunos</h2>
        <table>
          <thead>
            <tr key="00">
              <th>Nome do aluno</th>
              <th>Disciplina</th>
              <th>Nota</th>
              <th>Frequência</th>
            </tr>
          </thead>
          <tbody>
            <tr key="001">
              <td>Maria Silva</td>
              <td>Matematica</td>
              <td>85</td>
              <td>95%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};*/

export default TeacherDash;
