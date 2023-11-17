import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./loader.css";

const Loader = () => {
    const { isDarkMode } = useContext(ThemeContext);
    return (
        <div className={`loader ${isDarkMode ? "dark" : "light"}`}>
            <div class="loader-square"></div>
            <div class="loader-square"></div>
            <div class="loader-square"></div>
            <div class="loader-square"></div>
            <div class="loader-square"></div>
            <div class="loader-square"></div>
            <div class="loader-square"></div>
        </div>
    );
};

export default Loader;
