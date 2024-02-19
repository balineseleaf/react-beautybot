import { Link } from "react-router-dom";
import './BackButton.css';

const BackButton = (props) => {
  const { buttonText, to, type } = props;
  return (
    <Link to={to} className="back__button-link">
      <button className="back__button" type={type}>
        {buttonText}
      </button>
    </Link>
  );
}

export default BackButton;