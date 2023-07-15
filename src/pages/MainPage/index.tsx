import axios from "axios";
import { useEffect, useState } from "react";
import PokeCard from "../../components/PokeCard";
import AutoComplete from "../../components/AutoComplete";
import { PokemonData, PokemonNameAndUrl } from "../../types/PokemonData";

function MainPage() {
  // 모든 포켓몬 데이터를 가지고 있는 State
  const [allPokemons, setAllPokemons] = useState<PokemonNameAndUrl[]>([]);

  // 실제로 리스트로 보여주는 포켓몬 데이터를 가지고 있는 State
  const [displayPokemons, setDisplayPokemons] = useState<PokemonNameAndUrl[]>(
    []
  );

  // 한 번에 보여주는 포켓몬 수
  const limitNum = 20;
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;

  useEffect(() => {
    fetchPokeData();
  }, []);

  const filterDisplayedPokemonData = (
    allPokemonsData: PokemonNameAndUrl[],
    displayPokemons: PokemonNameAndUrl[] = []
  ) => {
    const limit = displayPokemons.length + limitNum;
    // 모든 포켓몬 데이터에서 limitNum 만큼 더 가져오기
    const array = allPokemonsData.filter((_, index) => index + 1 <= limit);
    return array;
  };

  const fetchPokeData = async () => {
    try {
      // 1008 포켓몬 데이터 받아오기
      const response = await axios.get<PokemonData>(url);
      // 모든 포켓몬 데이터 기억하기
      setAllPokemons(response.data.results);
      // 실제로 화면에 보여줄 포켓몬 리스트 기억하는 state
      setDisplayPokemons(filterDisplayedPokemonData(response.data.results));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="pt-6">
      <header className="flex flex-col gap-2 w-full px-4 z-50">
        <AutoComplete
          allPokemons={allPokemons}
          setDisplayPokemons={setDisplayPokemons}
        />
      </header>
      <section className="pt-6 flex flex-col justify-content items-center overflow-auto z-0">
        <div className="flex flex-row flex-wrap gap-[16px] items-center justify-center px-2 max-w-4xl">
          {displayPokemons.length > 0 ? (
            displayPokemons.map(({ url, name }: PokemonNameAndUrl) => (
              <PokeCard url={url} name={name} key={url} />
            ))
          ) : (
            <h2 className="font-medium text-lg text-slate-900 mb-1">
              포켓몬이 없습니다.
            </h2>
          )}
        </div>
      </section>
      <div className="text-center">
        {allPokemons.length > displayPokemons.length &&
          displayPokemons.length !== 1 && (
            <button
              onClick={() =>
                setDisplayPokemons(
                  filterDisplayedPokemonData(allPokemons, displayPokemons)
                )
              }
              className="bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white"
            >
              더 보기
            </button>
          )}
      </div>
    </article>
  );
}

export default MainPage;
