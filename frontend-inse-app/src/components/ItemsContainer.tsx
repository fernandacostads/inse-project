import { useItems } from "core/hooks";
import { BarLoader } from "react-spinners";

export default function ItemsContainer() {
  const getSchools = useItems();
  const schools = getSchools.data?.schools ?? [];

  if (getSchools.isLoading) {
    return (
      <div className="flex w-75">
        <BarLoader height={8} width="100%" />
      </div>
    );
  }

  // return (
  //   <div className="w-75">
  //     <div className="flex flex-wrap pt2">
  //       {schools.map((school) => {
  //         return (
  //           <div key={school.name} className="w-100 w-50-l ph3">
  //             <a className="link black hover-dark-blue" href="/t">
  //               <div className="flex flex-column h-200">
  //                 <img
  //                   style={{ objectFit: "cover", height: "420px" }}
  //                   alt=""
  //                   loading="lazy"
  //                   className="img flex-auto bg-gray"
  //                   src={school.src}
  //                 />

  //                 <div className="pt3 pb5 flex flex-column">
  //                   <b className="mb1">{school.name}</b>

  //                   <p className="ma0 b">Média: {school.media / 100}</p>
  //                   <p className="ma0 b ">Classificação: {school.classification.join(", ")}</p>
  //                 </div>
  //               </div>
  //             </a>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   </div>
  // );

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
            <tr key={school.name} className={index % 2 === 0 ? "bg-light-gray" : "bg-light-white"}>
              <td className="pa3 bb b--black-10">{school.uf}</td>
              <td className="pa3 bb b--black-10">{school.municipio}</td>
              <td className="pa3 bb b--black-10">{school.name}</td>
              <td className="pa3 bb b--black-10">{(school.media / 100).toFixed(2)}</td>
              <td className="pa3 bb b--black-10">{school.classification.join(", ")}</td>
              <td className="pa3 bb b--black-10">{school.quantidadeAlunos}</td>
              <td className="pa3 bb b--black-10">
                <button className="bg-green white ph3 pv2 br2 bn pointer">
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
