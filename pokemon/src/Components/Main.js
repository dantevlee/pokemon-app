import React, { useState, useEffect } from "react";
import Card from "./Card";
import Info from "./Info";
import Search from "./Search";
import axios from "axios";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();
  const [searchInput, setSearchInput] = useState('');

  const pokeFun = async () => {
    try {
      setLoading(true);
      const res = await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);

      const newPokemonData = await getPokemon(res.data.results);
      setPokeData((prevData) => {
        const existingIds = new Set(prevData.map((p) => p.id));
        const filteredNewPokemon = newPokemonData.filter(
          (p) => !existingIds.has(p.id)
        );

        const updatedData = [...prevData, ...filteredNewPokemon];
        updatedData.sort((a, b) => (a.id > b.id ? 1 : -1));
        return updatedData;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPokemon = async (res) => {
    const promises = res.map(async (item) => {
      const result = await axios.get(item.url);
      return result.data;
    });

    return Promise.all(promises);
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  useEffect(() => {
    if (!searchInput.trim()) {
     pokeFun()
    }
  }, [searchInput]);

  const handleSearch = async (search) => {
    setSearchInput(search);
    if (!search.trim()) {
      return;
    }
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      if (res.data) {
        setPokeData([res.data]);
      } 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <React.Fragment>
      {loading && <div>Loading...</div>}
      <div className="container">
        <Search search={handleSearch} />
        <div className="left-content">
          <Card
            pokemon={pokeData}
            loading={loading}
            infoPokemon={(poke) => setPokeDex(poke)}
          />
          <div className="btn-group">
            {prevUrl && pokeData.length > 1 && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(prevUrl);
                }}
              >
                Previous
              </button>
            )}
            {nextUrl && pokeData.length > 1 && (
              <button
                onClick={() => {
                  setPokeData([]);
                  setUrl(nextUrl);
                }}
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="right-content">
          <Info data={pokeDex} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main;