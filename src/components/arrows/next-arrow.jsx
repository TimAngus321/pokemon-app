import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './arrows.scss';

const NextArrow = (props) => {
  console.log("props.whosThatPokemonMode: ", props);
  return (
    <div>
    {props.whosThatPokemonMode ? (
      <div className="correct-answers">
        <p>Correct guesses: </p>
        <p>{props.correctAnswersCount}</p>
      </div>
    )
  : (
    <div
      className="right-arrow-container"
      onClick={(e) => props.nextPokemon()}
      data-testid="next-arrow-test"
    >
      <FontAwesomeIcon
        icon={faArrowRight}
        className="right-arrow"
      />
    </div>
    )}
    </div>
  );
};

export default NextArrow;
