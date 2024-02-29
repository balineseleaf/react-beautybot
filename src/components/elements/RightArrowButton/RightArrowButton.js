import { Link } from "react-router-dom";
import './RightArrowButton.css';

const RightArrowButton = (props) => {
  const { to, type, src, onClick, disabled, alt } = props;
  return (
    <Link to={to} className="right-arrow-button">
      <button disabled={disabled} onClick={onClick} className="back-button" type={type}>
        <img className="arrow-image" src={src} alt={alt} />
      </button>
    </Link>
  );
}

export default RightArrowButton;