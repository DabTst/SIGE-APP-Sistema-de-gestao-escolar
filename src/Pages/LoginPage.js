import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [userType, setuserType] = useState(""); //Teacher ou student
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    //console.log(`Tipo de Usuário: ${userType}, Email: ${email}`);

    if (userType === "aluno") {
      navigate("./StudentDash");
    } else if (userType === "professor") {
      navigate("./TeacherDash");
    } else if (userType === "admin") {
      navigate("./Administrador");
    } else {
      alert("Selecione o tipo de usuário!");
    }
  };
  return (
    <div className="login-page">
      <h1>
        Bem vindo ao <span>SIGES</span>
      </h1>
      <h4 className="tip">Faça Login com seus dados para entrar</h4>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            Você é:
            <select
              value={userType}
              onChange={(e) => setuserType(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="aluno">Aluno</option>
              <option value="professor">Professor</option>
              <option value="admin">Administrador</option>
            </select>
          </label>
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit"> Entrar</button>
      </form>
    </div>
  );
};

export default LoginPage;
