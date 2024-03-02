import './Header.css';
import { ReactComponent as Logo } from '../../../images/O-logo.svg';
import { Link } from "react-router-dom";
import LanguageDropdown from '../../elements/LanguageDropdown/LanguageDropdown';

const Header = () => {
  return (
    <div className="header">
      <LanguageDropdown />
      <div className='header__logo-box'>
        <Logo className="header__logo" />
        <h1 className="header__text">koshko</h1>
      </div>
      <Link to='/profile' >
        <div className="header__link-to-profile" alt="Иконка профиля"></div>
      </Link>
    </div>);
}

export default Header;