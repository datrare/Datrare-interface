import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./itemDialog.css";



const ItemDialog = ({ isOpen, selectedItem, toggleDialog }) => {
    const { isDarkMode } = useContext(ThemeContext);
    return (
        <div className={isDarkMode ? "dark" : "light"}>
            {isOpen && selectedItem && (
                <>
                    <div
                        className="overlay"
                        onClick={() => toggleDialog(null)}
                    />
                    <div className="dialog">
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="close-icon"
                            onClick={() => toggleDialog(null)}
                            size="2xl"
                            style={{ color: "var(--error-color)" }}
                        />
                        <div className="dialog-section">
                            <h2>Rank #{selectedItem.rank}</h2>
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
                            />
                            <h3>{selectedItem.name}</h3>
                            
                        
                        </div>
                        <div className="dialog-section">
                            <h2>Score: {selectedItem.scores.toFixed(2)}</h2>
                            <p>{selectedItem.description}</p>
                            {selectedItem.attributes.map((attr, index) => (
                               
                               <div className="attribute-wrapper">
                                <p>{attr.trait_type}</p>
                                <div className="progress-bar">
                                 <div className="progress-bar-fill"></div>
                                  <span className="progress-bar-label">{attr.value}</span>
                                   <span className="progress-bar-score">{attr.scores.toFixed(2)}</span>
                                 
                                 </div>
                                </div>

                           
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ItemDialog;
