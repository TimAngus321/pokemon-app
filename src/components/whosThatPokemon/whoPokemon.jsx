import { ReactComponent as PokeBall } from "../../svgs/pokeball.svg";
import { ReactComponent as PokeBallActive } from "../../svgs/pokeballActive.svg";
import styles from "./whoPokemon.module.scss";

const WhosThatPokemon = ({ whosThatPokemon, whosThatPokemonMode, classicMode, setClassicMode }) => {
  const handleTopClick = (e) => {
    e.stopPropagation();
    if (!whosThatPokemonMode) {
      setClassicMode('allPokemon'); // All Pokemon mode
      whosThatPokemon(false); // Pass false for classic mode
    } else {
      whosThatPokemon(); // Stop game
    }
  };

  const handleBottomClick = (e) => {
    e.stopPropagation();
    if (!whosThatPokemonMode) {
      setClassicMode('classic'); // Classic mode
      whosThatPokemon(true); // Pass true for classic mode
    } else {
      whosThatPokemon(); // Stop game
    }
  };

  return (
    <div className={styles.whosThatPokemon}>
      {!whosThatPokemonMode ? (
        <div className={styles.pokeBallContainer}>
          {/* Top half - All Pokemon */}
          <div 
            className={`${styles.pokeBallHalf} ${styles.topHalf} ${classicMode === 'allPokemon' ? styles.selected : ''}`}
            onClick={handleTopClick}
            title="All Pokemon (1-1025)"
          >
            <span className={styles.modeLabel}>All</span>
          </div>
          
          {/* Bottom half - Classic */}
          <div 
            className={`${styles.pokeBallHalf} ${styles.bottomHalf} ${classicMode === 'classic' ? styles.selected : ''}`}
            onClick={handleBottomClick}
            title="Classic Gen 1 (1-151)"
          >
            <span className={styles.modeLabel}>Gen 1</span>
          </div>
          
          <PokeBall className={styles.pokeBallSvg} alt="Who's that Pokemon?" />
        </div>
      ) : (
        <div className={styles.activePokeBall} onClick={whosThatPokemon}>
          <PokeBallActive alt="Stop game" />
          <p className={styles.gameMode}>
            {classicMode === 'classic' ? 'Classic Mode' : 'All Pokemon'}
          </p>
        </div>
      )}
    </div>
  );
};

export default WhosThatPokemon;
