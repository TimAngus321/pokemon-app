import React from "react";
import typeColours from "helpers/type-colours.js";

const PokemonCard = ({ pokeName, pokeId, pokeImg, pokemonDetails }) => {
  return (
    <div
      className="pokemon-card"
      style={{
        backgroundColor: typeColours[pokemonDetails.types[0].type.name],
      }}
    >
      <div className="pokemon-card-container">
        <div className="name-number-container">
          <h3 className="pokemon-name">{pokeName}</h3>
          <h3 className="pokemon-number">{pokeId}</h3>
        </div>

        <div className="sprite-container">
          <img src={pokeImg} alt="Pokémon Sprite" className="pokemon-sprite" />
        </div>
        <div className="type-container">
          {pokemonDetails.types.map((type, key) => (
            <div key={key}>
              <h3>{type.type.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
