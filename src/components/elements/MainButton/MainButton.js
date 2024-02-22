import { Link } from "react-router-dom";
import './MainButton.css';
import React from "react";
import ToolTip from '../../elements/ToolTip/ToolTip';

const MainButton = (props) => {
  const { buttonText, to, type, disabled } = props;

  return (
    <ToolTip showTooltip={disabled} text={"В вашем регионе еще нет салонов"} >
      <Link onClick={(event) => disabled && event.preventDefault()} to={to} className={disabled ? "main__button-link inactive" : "main__button-link"}>
        <button className="main__button" type={type}>
          {buttonText}
        </button>
      </Link>
    </ToolTip>
  );
}

export default MainButton;