import pokeBall from "../../svgs/pokeball.svg";
import "./whoPokemon.scss";

const WhosThatPokemon = () => {
    return (
        <div className="whos-that-pokemon">
            <img src={pokeBall} alt="Poke ball" />
        </div>
    )
}

export default WhosThatPokemon;