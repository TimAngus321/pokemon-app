import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./arrows.scss";

const NextArrow = (props) => {
  // Show counters if we're in a game session (classicMode is not null)
  const inGameSession = props.classicMode !== null;
  
  return (
    <div className="right-arrow-container" data-testid="next-arrow-test">
      {inGameSession ? (
        <div className="correct-answers">
          <p>
            Correct
            <br /> guesses:{" "}
          </p>
          <p>{props.correctAnswersCount}</p>
        </div>
      ) : (
        <div onClick={(e) => props.nextPokemon()} >
          <FontAwesomeIcon icon={faArrowRight} className="right-arrow" />
        </div>
      )}
    </div>
  );
};

export default NextArrow;
