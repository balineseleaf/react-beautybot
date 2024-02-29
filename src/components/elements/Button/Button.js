import { Link } from "react-router-dom";
import './Button.css';

const Button = (props) => {
  const { to, type, src } = props;
  return (
    <Link to={to} className="back-button-link">
      <button className="back-button" type={type}>
        <img className="arrow-image" src={src} alt="pink arrow" />
      </button>
    </Link>
  );
}

export default Button;