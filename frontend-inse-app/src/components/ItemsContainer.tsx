import React, { useState } from "react";
import { useItems } from "core/hooks";
import { BarLoader } from "react-spinners";
import Details from "./Details";

export default function ItemsContainer() {
  const getSchools = useItems();
  const schools = getSchools.data?.schools ?? [];
  const [details, setDetails] = useState(null);

  const showDetails = (school: any) => {
    setDetails(school);
  };

  const closeDetails = () => {
    setDetails(null);
  };

  if (getSchools.isLoading) {
    return (
      <div className="flex w-75">
        <BarLoader height={8} width="100%" />
      </div>
    );
  }

  if (details) {
    return <Details school={details} onClose={closeDetails} />;
  }

  return (
    <div className="w-75">
      <table className="w-100 ba br2 b--black-10 pv2 ph3 ma3 bg-light-gray">
        <thead>
          <tr className="tl bg-dark-blue white">
            <th className="pa3">UF</th>
            <th className="pa3">Município</th>
            <th className="pa3">Nome Escola</th>
            <th className="pa3">Média</th>
            <th className="pa3">Classificação</th>
            <th className="pa3">Alunos</th>
            <th className="pa3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school, index) => (
            <tr
              key={school.name}
              className={index % 2 === 0 ? "bg-light-gray" : "bg-light-white"}
            >
              <td className="pa3 bb b--black-10">{school.uf}</td>
              <td className="pa3 bb b--black-10">{school.municipio}</td>
              <td className="pa3 bb b--black-10">{school.name}</td>
              <td className="pa3 bb b--black-10">
                {(school.media / 100).toFixed(2)}
              </td>
              <td className="pa3 bb b--black-10">
                {school.classification.join(", ")}
              </td>
              <td className="pa3 bb b--black-10">{school.quantidadeAlunos}</td>
              <td className="pa3 bb b--black-10">
                <button
                  className="bg-green white ph3 pv2 br2 bn pointer"
                  onClick={() => showDetails(school)}
                >
                  Ver Detalhes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
