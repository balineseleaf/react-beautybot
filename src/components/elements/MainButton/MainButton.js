import { Link } from "react-router-dom";
import './MainButton.css';

const MainButton = (props) => {
    const { buttonText, to, type } = props;
    return (
        <Link to={to} className="main__button-link">
            <button className="main__button" type={type}>
                {buttonText}
            </button>
        </Link>
    );
}

export default MainButton;