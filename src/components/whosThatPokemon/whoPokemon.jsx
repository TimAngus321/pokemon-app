import { ReactComponent as PokeBall } from "../../svgs/pokeball.svg";
import { ReactComponent as PokeBallActive } from "../../svgs/pokeballActive.svg";
import styles from "./whoPokemon.module.scss";

const WhosThatPokemon = (props) => {
  return (
    <div
      className={styles.whosThatPokemon}
      onClick={(e) => props.whosThatPokemon()}
    >
      {!props.whosThatPokemonMode ? (
        <PokeBall alt="Who's that Pokemon?" />
      ) : (
        <PokeBallActive alt="Who's that Pokemon?" />
      )}
    </div>
  );
};

export default WhosThatPokemon;
