import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './arrows.scss';


const PreviousArrow = (props) => {
  return (
    <div
      className="left-arrow-container"
      onClick={(e) => props.previousPokemon()}
    >
      <FontAwesomeIcon
        className="left-arrow"
        style={{ width: "200px", height: "50px" }}
        icon={faArrowLeft}
      />
    </div>
  );
};

export default PreviousArrow;
