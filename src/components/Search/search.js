import { useState, useEffect } from "react";
import { getPokemonNames } from "services/get-pokemon-names";
import './search.scss';

const Search = (props) => {
  const [search, setSearch] = useState("");
  const [pokemonNames, setPokemonNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [filtered, setFiltered] = useState([]);
  const [isShow, setIsShow] = useState(false);

  //   Get all pokemon names
  useEffect(() => {
    (async function getAllPokeNames() {
        setIsLoading(true);
        const pokeNames = await getPokemonNames();
        const allPokeNames = pokeNames;
        setPokemonNames(allPokeNames);
        setIsLoading(false);
    })();
  }, []);

  //   Store all pokemon names in an array
  const allPokmonNames = [];
  if (!isLoading) {
    pokemonNames.map((pokeName) => allPokmonNames.push(pokeName.name));
  }

  // When a letter is added to input search through allPokemon names and see if there are matches
  const onChange = (e) => {
    if (allPokmonNames !== "[]") {
      const newFilteredSuggestions = allPokmonNames.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(search.toLowerCase()) > -1
      );
      setActive(0);
      setFiltered(newFilteredSuggestions);
      setIsShow(true);
      setSearch(e.currentTarget.value);
    }
  };

  // Input will clear on click
  const onClick = (e) => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setSearch(e.currentTarget.innerText);
  };
// Use up and down arrow and press enter to select from dropdown
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      // enter key
      setActive(0);
      setIsShow(false);
      setSearch(filtered[active]);
    } else if (e.keyCode === 38) {
      // up arrow
      return active === 0 ? null : setActive(active - 1);
    } else if (e.keyCode === 40) {
      // down arrow
      return active - 1 === filtered.length ? null : setActive(active + 1);
    }
  };


  // Injects Autocomplete into dom if user starts inputing text into input
  const renderAutocomplete = () => {
    if (isShow && search) {
      if (filtered.length) {
        return (
          <ul className="autocomplete">
            {filtered.map((suggestion, index) => {
              let className;
              if (index === active) {
                className = "active";
              }
              return (
                <li className={className} key={suggestion} onClick={onClick} >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      }
    }
    return <></>;
  };

  return (
    <div className="search-bar-container">
    <div className="search-control">
      <input
        type="text"
        className="search-input"
        name="search"
        placeholder="Search Pokemon"
        autocomplete="off"
        value={search}
        onChange={onChange}
        onKeyDown={onKeyDown}
        onClick={onClick}
      />
      <button
        onClick={(e) => props.pokemonSearch(search)}
        
        className="search-button"
      >
        Search
      </button>
      {renderAutocomplete()}
      </div>
    </div>
  );
};

export default Search;
