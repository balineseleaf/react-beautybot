import { Link } from "react-router-dom";
import './MainButton.css';
import React from "react";
import ToolTip from '../../elements/ToolTip/ToolTip';

const MainButton = (props) => {
  const { to, disabled, alt, src } = props;

  return (
    <ToolTip showTooltip={disabled} text={"В вашем регионе еще нет салонов"} >
      <Link onClick={(event) => disabled && event.preventDefault()} to={to} className={disabled ? "main__button-link inactive" : "main__button-link"}>
        <img src={src} alt={alt} className="mainbutton__icon" />
      </Link>
    </ToolTip>
  );
}

export default MainButton;