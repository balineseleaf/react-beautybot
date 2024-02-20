import { Link } from "react-router-dom";
import './Button.css';

const Button = (props) => {
  const { buttonText, to, type } = props;
  return (
    <Link to={to} className="back-button-link">
      <button className="back-button" type={type}>
        {buttonText}
      </button>
    </Link>
  );
}

export default Button;