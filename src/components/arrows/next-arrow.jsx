import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./arrows.scss";

const NextArrow = (props) => {
  console.log("props.whosThatPokemonMode: ", props);
  return (
    <div className="right-arrow-container">
      {props.whosThatPokemonMode ? (
        <div className="correct-answers">
          <p>
            Correct
            <br /> guesses:{" "}
          </p>
          <p>{props.correctAnswersCount}</p>
        </div>
      ) : (
        <div onClick={(e) => props.nextPokemon()} data-testid="next-arrow-test">
          <FontAwesomeIcon icon={faArrowRight} className="right-arrow" />
        </div>
      )}
    </div>
  );
};

export default NextArrow;
