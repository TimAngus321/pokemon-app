import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./arrows.scss";

const PreviousArrow = (props) => {
  // Show counters if we're in a game session (classicMode is not null)
  const inGameSession = props.classicMode !== null;
  
  return (
    <div className="left-arrow-container">
      {inGameSession ? (
        <div className="incorrect-answers">
          <p>Incorrect guesses: </p>
          <p>{props.incorrectAnswersCount}</p>
        </div>
      ) : (
        <div onClick={(e) => props.previousPokemon()}>
          <FontAwesomeIcon className="left-arrow" icon={faArrowLeft} />
        </div>
      )}
    </div>
  );
};

export default PreviousArrow;
