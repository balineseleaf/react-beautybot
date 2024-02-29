import React from "react";
import "./ToolTip.css";
import { useState } from "react";


const ToolTip = ({ text, children, showTooltip }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="tooltip__container" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {children}
      {showTooltip && isVisible && <div className="tooltip">{text}</div>}
    </div>);
}

export default ToolTip;