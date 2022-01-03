import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NextArrow = (props) => {


  return (
    <div className="right-arrow-container" onClick={(e) => props.nextPokemon()}>
      <FontAwesomeIcon
        icon={faArrowRight}
        style={{ width: "200px", height: "50px" }}
        className="right-arrow"
      />
    </div>
  );
};

export default NextArrow;
