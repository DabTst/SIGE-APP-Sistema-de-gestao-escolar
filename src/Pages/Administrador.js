import React, { useState } from "react";

const Administrador = () => {
  const [viewType, setViewType] = useState(""); //student ou Teacher
  const [data, setData] = useState([]); //student data ou teacher
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    classe: "",
    disciplina: "",
  });
  const [error, seterror] = useState("");
  const [confirmDeleteIndex, setConfirmDeleteIndex] = useState(null);
  //const [userType, setuserType] = useState("");

  const handleViewChange = (type) => {
    setViewType(type);
    setData([]);
    //fetchData(type); //bisca de dados
  };

  // const fetchData = (type) => {
  //   if (type === "aluno") {
  //     setData([
  //       { nome: "Djane Bucar", idade: 23, classe: "9A" },
  //       { nome: "Joao", idade: 23, classe: "9B" },
  //     ]);
  //   } else if (type === "professor") {
  //     setData([
  //       { nome: "Aurelio Franco", disciplina: "Matematica" },
  //       { nome: "Franco Bila", disciplina: "Fisica" },
  //     ]);
  //   }
  // };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.nome) return "O nome é Obrigatório";
    if (viewType === "aluno") {
      if (!formData.idade || isNaN(formData.idade))
        return "a idade deve ser numerica";
      if (!formData.classe) return "A classe é Obrigatória";
    }
    if (viewType === "professor") {
      if (!formData.disciplina) return "A disciplina é Obrigatória";
    }
    return "";
  };

  const handleAddData = () => {
    const validationError = validateForm();
    if (validationError) {
      seterror(validationError);
      return;
    }
    seterror("");
    setData([...data, formData]);
    setFormData({ nome: "", idade: "", classe: "", disciplina: "" });
  };

  const handleDelete = () => {
    const updatedData = data.filter((_, i) => i !== confirmDeleteIndex);
    setData(updatedData);
    setConfirmDeleteIndex(null);
  };

  return (
    <div className="dashboard admin-dashboard">
      <h1>Painel do Administrador</h1>
      <div className="section">
        <h2 className="admin-btn">Selecione a visualização do grupo</h2>
        <button className="admin-btn" onClick={() => handleViewChange("aluno")}>
          Alunos
        </button>
        <button
          className="admin-btn"
          onClick={() => handleViewChange("professor")}
        >
          Professores
        </button>
      </div>

      {viewType && (
        <div className="section">
          <h2>Adicionar {viewType === "aluno" ? "Aluno" : "Professor"} </h2>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
          {viewType === "aluno" && (
            <>
              <input
                type="number"
                name="idade"
                placeholder="Idade"
                value={formData.idade}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="classe"
                placeholder="Classe(exemplo: 9)"
                value={formData.classe}
                onChange={handleInputChange}
              />
            </>
          )}
          {viewType === "professor" && (
            // <input
            //   type="text"
            //   name="disciplina"
            //   placeholder="Disciplina"
            //   value={formData.disciplina}
            //   onChange={handleInputChange}
            // />
            <select
              name="disciplina"
              value={formData.disciplina}
              onChange={handleInputChange}
            >
              <option value="">Disciplina</option>
              <option value="Português">Português</option>
              <option value="Matematica">Matematica</option>
              <option value="Fisica">Física</option>
              <option value="quimica">Quimica</option>
              <option value="Geografia">Geografia</option>
              <option value="Inglês">Inglês</option>
              <option value="Fisica">Física</option>
              <option value="Frances">Francês</option>
              <option value="Agro-Pecuária">Agro-Pecuária</option>
              <option value="Desenho">Desenho</option>
              <option value="Educação Fisica">Educação Física</option>
            </select>
          )}
          <button onClick={handleAddData}>Adicionar</button>
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {viewType === "aluno" && (
        <div className="section">
          <h2>Dados dos Alunos</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Classe</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((aluno, index) => (
                <tr key={index}>
                  <td>{aluno.nome}</td>
                  <td>{aluno.idade}</td>
                  <td>{aluno.classe}</td>
                  <td>
                    <button onClick={() => setConfirmDeleteIndex(index)}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {viewType === "professor" && (
        <div className="section">
          <h2>Dados dos Professores</h2>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Disciplina</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {data.map((professor, index) => (
                <tr key={index}>
                  <td>{professor.nome}</td>
                  <td>{professor.disciplina}</td>
                  <td>
                    <button onClick={() => setConfirmDeleteIndex(index)}>
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmDeleteIndex !== null && (
        <div className="confirm-delete-modal">
          <p>Tem certeza de que deseja excluir esse registro?</p>
          <button onClick={handleDelete}>Sim</button>
          <button onClick={() => setConfirmDeleteIndex(null)}>Não</button>
        </div>
      )}
    </div>
  );
};

export default Administrador;
