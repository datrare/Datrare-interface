import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./dialogMessage.css";

const DialogMessage = ({ message }) => {
    const {isDarkMode} = useContext(ThemeContext);
    return (
        <div className={`like-status-dialog-message ${isDarkMode ? "dark":"light"}`}>
            <p className={message.status === "failed" ? "fail" : "success"}>{message.message}</p>
        </div>
    );
};

export default DialogMessage;
