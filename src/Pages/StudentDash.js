import React from "react";
import "../Dashboard.css";

const StudentDash = () => {
  return (
    <div className="dashboard student-dashboard">
      <h1>Bem vindo ao seu painel de controle, Caro estudante</h1>

      <div className="section">
        <h2>Notas</h2>
        <table>
          <thead>
            <tr key="0">
              <th>Disciplina</th>
              <th>Nota</th>
            </tr>
          </thead>
          <tbody>
            <tr key="01">
              <td>Matematica</td>
              <td>85</td>
            </tr>
            <tr key="02">
              <td>Inglês</td>
              <td>95</td>
            </tr>
            <tr key="03">
              <td>Português</td>
              <td>75</td>
            </tr>
            <tr key="04">
              <td>Geografia</td>
              <td>89</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Frequência</h2>
        <p>Frequência Geral: 92</p>
      </div>

      <div className="section">
        <h2>Exames</h2>
        <p>Exames pendente: Nenhum: 92</p>
      </div>

      <div className="section">
        <h2>Avaliar professores </h2>
        <button>Avaliar</button>
      </div>
    </div>
  );
};

export default StudentDash;
