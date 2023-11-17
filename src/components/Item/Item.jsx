import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./item.css";

function RankSuffix({ rank, dataLength }) {
    const percentage = (rank / dataLength) * 100;

    if (percentage <= 5) {
        return <span className="rank-suffix legendary">Legendary</span>;
    } else if (percentage <= 10) {
        return <span className="rank-suffix mythical">Mythical</span>;
    } else if (percentage <= 50) {
        return <span className="rank-suffix rare">Rare</span>;
    } else if (percentage <= 75) {
        return <span className="rank-suffix uncommon">Uncommon</span>;
    } else {
        return <span className="rank-suffix common">Common</span>;
    }
}

const Item = ({ image, index, data, toggleDialog }) => {
    const { isDarkMode } = useContext(ThemeContext);
    return (
        <div
            key={index}
            className={`image-container ${isDarkMode ? "dark" : "light"}`}
            onClick={() => toggleDialog(image)}
        >
            
                <img src={image.image} alt={image.name} />
            
            <div className="image-details">
                <p>{image.name}</p>
                <p className="rank">Rank: {image.rank}</p>
            </div>
            <RankSuffix rank={image.rank} dataLength={data.length} />
        </div>

        
    );
};

export default Item;
