import React, { useState } from "react";
import AquaGPT from "./AquaGPT";
function IconInteraction() {
  const [click, setClick] = useState(false);
  const handleIconClick = () => setClick((click) => !click);
  return (
    <div className="main">
      <div className="ai-icon">
        {console.log(click)}
        {click ? (
          <AquaGPT clicked={click} />
        ) : (
          <img
            src="../src/assets/posideon.png"
            width={100}
            alt="Aqua GPT"
            onClick={handleIconClick}
          />
        )}
      </div>
    </div>
  );
}

export default IconInteraction;
