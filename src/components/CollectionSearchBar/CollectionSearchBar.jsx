import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./collectionSearchBar.css";
import ThemeContext from "../../context/ThemeContext";

const CollectionSearchBar = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [collectionsData, setCollectionsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/collections`);
            const data = await response.json();
            setCollectionsData(data);
        };
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCollections = collectionsData.filter((collection) =>
        collection.collection_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
    return (
        <div className={`search-bar ${isDarkMode ? "dark" : "light"}`}>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
                type="text"
                placeholder="Search collections"
                onChange={handleSearch}
            />
            {searchTerm !== "" && (
                <div className="search-results">
                    {filteredCollections.length > 0 ? (
                        filteredCollections.map((collection) => (
                            <a
                                href={collection.url}
                                key={collection.collection_id}
                            >
                                <div className="collection-preview">
                                    <img
                                        src={collection.logo}
                                        alt={collection.collection_name}
                                    />
                                    <span>{collection.collection_name}</span>
                                </div>
                            </a>
                        ))
                    ) : (
                        <span>No matching collections found</span>
                    )}
                </div>
            )}
        </div>
    );
};

export default CollectionSearchBar;
