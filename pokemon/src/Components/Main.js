import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Search from "./Search";
import axios from "axios";
import Table from "./Table";

const Main = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((res) => {
      const numberOfPages = calculatePages(res.data.count);
      setPageCount(numberOfPages);
      setAttributes(res.data.results);
      setLoading(false);
    });
  }, []);

  const setAttributes = async (attributes) => {
    for (const attribute of attributes) {
      const attributeUrl = attribute.url;
      attribute.image = await getImage(attributeUrl);
      attribute.weight = await getWeight(attributeUrl);
      attribute.height = await getHeight(attributeUrl);
      attribute.abilities = await getMoves(attributeUrl);
      attribute.types = await getType(attributeUrl);
    }

    setPokemon(attributes);
  };

  const getImage = async (imageUrl) => {
    const response = await axios.get(imageUrl);
    return response.data.sprites.front_default;
  };

  const getWeight = async (weight) => {
    const response = await axios.get(weight);
    return response.data.weight;
  };

  const getHeight = async (height) => {
    const response = await axios.get(height);
    return response.data.height;
  };

  const getMoves = async (abiltiy) => {
    const response = await axios.get(abiltiy);
    const abilities = response.data.abilities.map((a) => a.ability.name);
    return abilities;
  };

  const getType = async (type) => {
    const response = await axios.get(type);
    const types = response.data.types.map((t) => t.type.name);
    return types;
  };

  const calculatePages = (count) => {
    return Math.ceil(count / 19.9);
  };

  const handlePageChange = (offset) => {
    const selectedPage = offset * 20;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${selectedPage}&limit=20`)
      .then((res) => setAttributes(res.data.results));
  };

  const handleSearch = async (search) => {
    if (!search.trim()) {
      return;
    }
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${search}`
    );

    const searchedPokemon = {
      id: response.data.id,
      name: response.data.name,
      image: response.data.sprites.front_default,
      weight: response.data.weight,
      height: response.data.height,
      abilities: response.data.abilities.map((a) => a.ability.name),
      types: response.data.types.map((t) => t.type.name),
    };

    setPokemon([searchedPokemon]);
  };

  return (
    <React.Fragment>
      <div>
        <h1>
          <center>
            <p className="text-danger font-weight-bold">Poke Data</p>
          </center>
        </h1>
        <Search search={handleSearch} />
        {loading && <h1>Loading..</h1>}
        {!loading && <Table pokemon={pokemon} />}
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={10} // Adjust this value
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => {
            handlePageChange(selected);
          }}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </React.Fragment>
  );
};

export default Main;
