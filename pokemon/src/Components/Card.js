import React from "react";
const Card = ({ pokemon, loading, infoPokemon }) => {
  return (
    <React.Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        pokemon.map(p => {
          return (
            <>
              <div className="card" key={p.id} onClick={()=>infoPokemon(p)}>
                <h2>{p.id}</h2>
                <img src={p.sprites.front_default} alt="" />
                <h2>{p.name}</h2>
              </div>
            </>
          );
        })
      )}
    </React.Fragment>
  );
};
export default Card;
