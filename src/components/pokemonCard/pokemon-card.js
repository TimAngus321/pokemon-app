import React from "react";
import typeColours from "helpers/type-colours.js";
import typeIcons from "helpers/type-icons.js";
import "./pokemon-card.scss";

const PokemonCard = ({ pokemonDetails, whosThatPokemonMode }) => {
  // console.log("pokemonDetails: ", pokemonDetails);
  console.log("whosThatPokemonMode: ", whosThatPokemonMode);
  return (
    <div
      className="pokemon-card"
      // style={{
      //   backgroundColor: typeColours[pokemonDetails.types[0].type.name],
      // }}
    >
      <div className="pokemon-card-container">
        <div className="name-number-container">
          <h2 className="pokemon-name">{pokemonDetails.name}</h2>
          <div className="hp-types-container">
            <h3
              className="pokemon-number"
              data-testid="poke-id-test"
            >
              {pokemonDetails.stats[0].base_stat} HP
            </h3>
            <div className="type-container">
              {pokemonDetails.types.map((type, key) => {
                const IconComponent = typeIcons[type.type.name];
                return (
                  <div key={key} className="type-item">
                    {IconComponent && (
                      <IconComponent
                        className="type-icon"
                        style={{ color: typeColours[type.type.name] }}
                        aria-label={`${type.type.name} type icon`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="sprite-container">
          <img
            src={
              pokemonDetails.sprites.other.dream_world.front_default ||
              pokemonDetails.sprites.other["official-artwork"].front_default ||
              pokemonDetails.sprites.front_default
            }
            alt={pokemonDetails.name}
            className="pokemon-sprite"
            style={{ filter: whosThatPokemonMode ? "brightness(0) invert(1)" : "none" }}
          />
           <p className="pokemon-name">
          Height: {pokemonDetails.height * 10}cm, Weight: {pokemonDetails.weight} lbs
        </p>
        </div>
        <div className="stats-container">
        <div><h3>ID: </h3><p>{pokemonDetails.id}</p></div>
          {pokemonDetails.stats.slice(1).map((stat, key) => (
            <div key={key}>
              <h3>
                {stat.stat.name.includes("special")
                  ? stat.stat.name.replace("special-", "sp.")
                  : stat.stat.name}
                :
              </h3>
              <p>{stat.base_stat}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
