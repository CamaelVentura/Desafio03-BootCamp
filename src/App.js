import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(()=> {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
      url: "https://camael",
	    techs: ["Node.js", "..."]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const index = repositories.findIndex(x => x.id === id);
    const response = await api.delete(`repositories/${id}`);
    var aux = [...repositories];
    aux.splice(index, 1);

    setRepositories([...aux]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (        
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
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
