import "./collectionCard.css";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../context/ThemeContext";
import { useContext } from "react";

const CollectionCard = ({
    collection
}) => {
    
    const navigate = useNavigate();
    const { isDarkMode } = useContext(ThemeContext);

    const handleNavClick = () => {
        navigate(collection.url);
    };

    return (
        <div
            className={`collection-card ${isDarkMode ? "dark" : "light"}`}
            onClick={handleNavClick}
        >
            <div className="image-wrapper">
                <span>{collection.chain}</span>
                <img src={collection.logo} alt={collection.collection_name} />
            </div>
            <div className="name-icon-wrapper">
                <h2>{collection.collection_name}</h2>
            </div>
            <p className="description">{collection.description}</p>
        </div>
    );
};

export default CollectionCard;
