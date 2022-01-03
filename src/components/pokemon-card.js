import React from 'react';

const PokemonCard = ({ pokeName, pokeId, pokeImg, pokemonDetails  }) => {

    return (
      <div className="pokemon-card">
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
    );
  };
  
  export default PokemonCard;

  
