import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  let [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);
  async function handleAddRepository() {
    // var nome = prompt("Digite nome do repositorio:");
    // var techs = prompt("Digite á tecnologia usada");
    // var url = prompt("Digite á url");

    let response = await api.post("repositories", {
      id: "123",
      title: `${Date.now()}`,
      url: `${Date.now()}`,
      techs: `${Date.now()}`,
    });
    const repositorie = response.data;
    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository(id) {
    let repositorieIndex = repositories.findIndex((tessss) => tessss.id === id);

    await api
      .delete(`repositories/${id}`)
      .then(() => {
        repositories.splice(repositorieIndex, 1);
        setRepositories([...repositories]);
      })
      .catch((error) => {
        alert(`${error}`);
      });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repositorie) => (
          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
