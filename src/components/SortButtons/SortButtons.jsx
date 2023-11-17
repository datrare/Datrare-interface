import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./sortButtons.css";

const SortButtons = ({radio, setRadio}) => {
  const { isDarkMode } = useContext(ThemeContext);
  const handleRadioChange = (event) => {
    setRadio(event.target.value);
  }

  return (
    <div className={`sort-buttons-container ${isDarkMode ? "dark" : "light"}`}>
      <form>
        <label>
          <input 
            type="radio" 
            name="radio" 
            value="rank"
            checked={radio === 'rank'}
            onChange={handleRadioChange}
          />
          <span>Rank</span>
        </label>
        <label>
          <input 
            type="radio" 
            name="radio" 
            value="edition"
            checked={radio === 'edition'}
            onChange={handleRadioChange}
          />
          <span>Edition</span>
        </label>
        {/* <label>
          <input 
            type="radio" 
            name="radio" 
            value="scores"
            checked={radio === 'scores'}
            onChange={handleRadioChange}
          />
          <span>Scores</span>
        </label> */}
      </form>
    </div>
  );

}

export default SortButtons