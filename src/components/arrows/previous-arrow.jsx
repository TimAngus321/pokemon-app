import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./arrows.scss";

const PreviousArrow = (props) => {
  return (
    <div className="left-arrow-container">
      {props.whosThatPokemonMode ? (
        <div className="incorrect-answers">
          <p>Incorrect answers: </p>
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
