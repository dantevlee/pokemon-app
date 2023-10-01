import React from "react"

const Table = ({pokemon}) => {

  const tBody = pokemon.map((p) => (
     <tr key={p.id}>
    <td><img src={p.image ? p.image : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png`}></img></td>
     <td>{p.name.toUpperCase()}</td>
     <td>{p.weight}lbs</td>
     <td>{p.height}ft</td>
     <td>{p.abilities.join("/").toUpperCase()}</td>
     <td>{p.types.join("/").toUpperCase()}</td>
     </tr>
  ))
  
  return(
    <React.Fragment>
      <div className="container">
        <div className="row">
        <table className="table table-sm table-bordered table-warning table-hover">
          <thead>
          <tr>
          <th scope="col">Image</th>
          <th scope="col">Name</th>
          <th scope="col">Weight</th>
          <th scope="col">Height</th>
          <th scope="col" >Abilities</th>
          <th scope="col">Type</th>
          </tr>
          </thead>
          <tbody>
            {tBody}
          </tbody>
        </table>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Table;