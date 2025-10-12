import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './arrows.scss';

const NextArrow = (props) => {
  return (
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
  );
};

export default NextArrow;
