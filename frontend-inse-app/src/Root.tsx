import { useMemo } from "react";
import SearchBar from "components/SearchBar";
import Select from "components/Select";
import { useItems } from "core/hooks";
import ItemsContainer from "components/ItemsContainer";
import { useSearchParams } from "react-router-dom";
import ClassificationFilters from "components/ClassificationFilters";
import MediaFilter from "components/MediaFilter";

export default function Root() {
  const [search, setSearch] = useSearchParams();
  const getItems = useItems();
  const items = useMemo(() => getItems.data?.schools ?? [], [getItems.data]);
  const itemCounts = useMemo(
    () =>
      items.reduce<Record<string, number>>((initial, item) => {
        if (!isNaN(initial[item.category])) {
          initial[item.category] += 1;
        } else {
          initial[item.category] = 1;
        }

        return initial;
      }, {}),
    [items]
  );
  const maxMedia = (getItems.data?.maxMedia ?? 0) / 100;

  return (
    <div className="mw9 center ph4 bg-white min-vh-100 br bl b--light-gray">
      <div className="flex bb b--black-10 justify-between items-center mb4">
        <h1>Nível Socioeconômico (Inse) - 2021</h1>

        <div className="mr3 ml-auto">
          <SearchBar />
        </div>

        <Select
          onChange={(e) => {
            search.set("sort", e.target.value);
            setSearch(search, {
              replace: true,
            });
          }}
          label="Ordenar por"
          name="sort"
          options={[
            {
              label: "Nome escola",
              value: "name",
            },
            {
              label: "Maior média",
              value: "mediaDesc",
            },
            {
              label: "Menor média",
              value: "mediaAsc",
            },
          ]}
        />
      </div>

      <div className="flex">
        <div className="w-25 mr4">
          <div style={{ position: "sticky", top: "20px" }}>
            <ul className="list pa0 ma0 pb3 bb b--black-10">
              <li className="f6 fw5 silver mb2">
                <div className="flex justify-between">
                  Filtros
                  <span>{items.length} escolas</span>
                </div>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Rede 1
                  <span>{itemCounts["1"] ?? 0}</span>
                </button>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Rede 2
                  <span>{itemCounts["2"] ?? 0}</span>
                </button>
              </li>
              <li>
                <button className="btn bn fw5 pa0 pv2 w-100 tl bg-transparent hover-light-purple flex justify-between">
                  Rede 3
                  <span>{itemCounts["3"] ?? 0}</span>
                </button>
              </li>
            </ul>

            <ClassificationFilters />
            <MediaFilter maxMedia={maxMedia} />
          </div>
        </div>

        <ItemsContainer />
      </div>
    </div>
  );
}
