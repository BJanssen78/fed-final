import React from "react";
// import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const checkmark = <FontAwesomeIcon icon={faCheck} />;

export const Fase = () => {
  return (
    <React.Fragment>
      <div className="fase">
        <h1>Een korte uitleg over de verschillende fases van mijn project</h1>
        <p>Klik op een van de fases voor meer details.</p>
        <div className="fase-lijst-container">
          <ul className="fase-lijst">
            <li>
              <input type="checkbox" id="fase-1" />
              <label htmlFor="fase-1">
                Fase 1 (6/6) <span className="task-done">{checkmark}</span>
              </label>

              <ul className="sub-fase-lijst">
                <li>
                  Plannen van het project{" "}
                  <span className="task-done">{checkmark}</span>
                </li>
                <li>
                  Maken van een header/titel{" "}
                  <span className="task-done">{checkmark}</span>
                </li>
                <li>
                  Connectie maken met de server{" "}
                  <span className="task-done">{checkmark}</span>
                </li>
                <li>
                  Testen van de connectie met behulp van een output pagina{" "}
                  <span className="task-done">{checkmark}</span>
                </li>
                <li>
                  Event lijst maken{" "}
                  <span className="task-done">{checkmark}</span>
                </li>
                <li>
                  Event detail kaart maken{" "}
                  <span className="task-done">{checkmark}</span>
                </li>
              </ul>
            </li>
            <li>
              <input type="checkbox" id="fase-2" />
              <label htmlFor="fase-2">
                Fase 2 (3/3) <span className="task-done">{checkmark}</span>
              </label>
              <ul className="sub-fase-lijst">
                <li>
                  Creëren van een navigatie balk{" "}
                  <span className="task-done">{checkmark}</span>
                </li>
                <li>
                  Bepalen van de items op de navigatie balk{" "}
                  <span className="task-done">{checkmark}</span>
                </li>
                <li>
                  Testen van de routing{" "}
                  <span className="task-done">{checkmark}</span>
                </li>
              </ul>
            </li>
            <li>
              <input type="checkbox" id="fase-3" />
              <label htmlFor="fase-3">Fase 3 (1/4)</label>
              <ul className="sub-fase-lijst">
                <li>Creëren user login pagina</li>
                <li>Creëren van een create new user formulier</li>
                <li>
                  Aanmaken van user roles{" "}
                  <span className="task-done">{checkmark}</span>
                </li>
                <li>Testen user roles</li>
              </ul>
            </li>
            <li>
              <input type="checkbox" id="fase-4" />
              <label htmlFor="fase-4">Fase 4 (0/3)</label>
              <ul className="sub-fase-lijst">
                <li>Creëren formulier new events</li>
                <li>Creëren formulier edit events</li>
                <li>Creëren formulier remove events</li>
              </ul>
            </li>
            <li>
              <input type="checkbox" id="fase-5" />
              <label htmlFor="fase-5">Fase 5 (0/3)</label>
              <ul className="sub-fase-lijst">
                <li>Creëren error boundries</li>
                <li>Creëren afhandeling errors</li>
                <li>Testen error boundries</li>
              </ul>
            </li>
            <li>
              <input type="checkbox" id="fase-6" />
              <label htmlFor="fase-6">Fase 6 (0/2)</label>
              <ul className="sub-fase-lijst">
                <li>Creëren contact formulier</li>
                <li>Testen contact formulier</li>
              </ul>
            </li>
            <li>
              <input type="checkbox" id="fase-7" />
              <label htmlFor="fase-7">Fase 7 (0/3)</label>
              <ul className="sub-fase-lijst">
                <li>Produceren uiteindelijke product</li>
                <li>Uploaden van site/app</li>
                <li>Indienen van product en code bij de Academy</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};
