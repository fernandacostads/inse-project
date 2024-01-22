import React from "react";
import { School } from "../core/types";

type DetailsProps = {
  school: School;
  onClose: () => void;
};

const Details: React.FC<DetailsProps> = ({ school, onClose }) => {
  return (
    <div>
      <h2>Detalhes da Escola</h2>
      <div className=" flex flex-column">
        <div className="mb2">
          <strong>Nome:</strong> {school.name}
        </div>
        <div className="mb2">
          <strong>UF:</strong> {school.uf}
        </div>
        <div className="mb2">
          <strong>Município:</strong> {school.municipio}
        </div>
        <div className="mb2">
          <strong>Média:</strong> {(school.media / 100).toFixed(2)}
        </div>
        <div className="mb2">
          <strong>Classificação:</strong> {school.classification.join(", ")}
        </div>
        <div className="mb2">
          <strong>Quantidade de Alunos:</strong> {school.quantidadeAlunos}
        </div>
        <div className="mt3">
          <button
            className="bg-dark-blue white ph3 pv2 br2 bn pointer"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
