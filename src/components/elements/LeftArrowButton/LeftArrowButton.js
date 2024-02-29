import { Link } from "react-router-dom";
import './LeftArrowButton.css';

const LeftArrowButton = (props) => {
  const { to, type, src, alt } = props;
  return (
    <Link to={to} className="left-arrow-button">
      <button className="back-button" type={type}>
        <img className="arrow-image" src={src} alt={alt} />
      </button>
    </Link>
  );
}

export default LeftArrowButton;