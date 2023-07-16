import React from "react";

export const Fase = () => {
  return (
    <React.Fragment>
      <div className="fase">
        <h1>Een korte uitleg over de verschillende fases van mijn project</h1>
        <div className="fase-lijst-container">
          <ul className="fase-lijst">
            <li>
              Fase 1
              <ul className="sub-fase-lijst">
                <li className="task-done">Plannen van het project</li>
                <li>Maken van een header/titel</li>
                <li>Connectie maken met de server</li>
                <li>
                  Testen van de connectie met behulp van een output pagina
                </li>
              </ul>
            </li>
            <li>
              Fase 2
              <ul className="sub-fase-lijst">
                <li>Creëren van een navigatie balk</li>
                <li>Bepalen van de items op de navigatie balk</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
