import { ReactComponent as PokeBall } from "../../svgs/pokeball.svg";
import styles from "./whoPokemon.module.scss";

const WhosThatPokemon = (props) => {
  return (
    <div
      className={styles.whosThatPokemon}
      onClick={(e) => props.whosThatPokemon()}
    >
      <PokeBall alt="Who's that Pokemon?" />
    </div>
  );
};

export default WhosThatPokemon;
