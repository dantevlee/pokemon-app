
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Search from "./Search";
import axios from "axios";
import Table from "./Table";
import { Alert } from "react-bootstrap";

const Main = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [visitCount, setVisitCount] = useState(1)
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  useEffect(() => {
    if (visitCount === 1){
      setIsInitialLoad(true)
    }
    axios.get("https://pokeapi.co/api/v2/pokemon/").then((res) => {
      const numberOfPages = calculatePages(res.data.count);
      setPageCount(numberOfPages);
      setAttributes(res.data.results);
      setIsInitialLoad(false)
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
    if (visitCount === 1){
      setIsInitialLoad(true)
    }
    const selectedPage = offset * 20;
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?offset=${selectedPage}&limit=20`)
      .then((res) => setAttributes(res.data.results));
      setIsInitialLoad(false)
      if(visitCount > 0){
        setVisitCount(0)
      }
  };

  const handleSearch = async (search) => {
    if (visitCount === 1){
      setIsInitialLoad(true)
    }
    if (!search.trim()) {
      return;
    }
    try {
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
      setIsInitialLoad(false)
    } catch (error) {
      return;
    }

    if(visitCount > 0){
      setVisitCount(0)
    }
  };

  const removeNotification = () => {
    setIsInitialLoad(false);
    setVisitCount(0)
  }

  return (
    <React.Fragment>
        {isInitialLoad && (
        <Alert variant="info" onClose={() => removeNotification()} dismissible>
          This server is running on a free instance in the cloud that spins down if unused. It may take a few seconds for the first app initialization. Thank you for your patience!
        </Alert>
      )}
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