import React, { useState, useEffect, useContext } from "react";
import "./css/Collections.css";
import CollectionCard from "./components/CollectionCard/CollectionCard";
import Pagination from "./components/Pagination/Pagination";
import ThemeContext from "./context/ThemeContext";
import axios from "axios";

const Collections = () => {
    const [collectionsData, setCollectionsData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedChain, setSelectedChain] = useState("");
    const { isDarkMode } = useContext(ThemeContext);
    const collectionsPerPage = 16;
    const fetchData = async (url) => {
        const response = await fetch(process.env.REACT_APP_API_URL + url);
        return response.json();
    };

    useEffect(() => {
        Promise.all([
            fetchData("/collections"),
            
        ])
            .then(([collectionsData]) => {
                console.log(collectionsData);
                setCollectionsData(collectionsData);
                // setLikedCollectionId(
                //     checkLikeData[0] ? checkLikeData[0].collection_id : null
                // );
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    useEffect(() => {
        const fetchCollectionsData = async () => {
            try {
                const response = await axios.get("/collections");
                console.log(response.data);
                setCollectionsData(response.data);
            } catch (error) {
                console.error("Error fetching collections data:", error);
            }
        };
        fetchCollectionsData();
    }, []);
    

    const sortedCollections = Array.isArray(collectionsData) 
    ? collectionsData
        .filter((collection) => {
            if (selectedChain === "") {
                return true;
            } else {
                return collection.chain === selectedChain;
            }
        })
        .sort((a, b) => b.collection_id - a.collection_id)
    : [];

    const indexOfLastCollection = currentPage * collectionsPerPage;
    const indexOfFirstCollection = indexOfLastCollection - collectionsPerPage;
    const currentCollections = collectionsData.length > 0 ? sortedCollections.slice(
        indexOfFirstCollection,
        indexOfLastCollection
    ) : [];

    const totalPages = Math.ceil(sortedCollections.length / collectionsPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const handleSelectChange = (e) => {
        setSelectedChain(e.target.value);
        setCurrentPage(1);
    };

    return (
    <div className={`collections-wrapper ${isDarkMode ? "dark" : "light"}`}>
        <div className="sort-by-container">
            <label htmlFor="sort-by-select">Select Chain:</label>
            <select
                id="sort-by-select"
                value={selectedChain}
                onChange={handleSelectChange}
            >
                <option value="">All Chains</option>
                <option value="zksync">zkSync</option>
                <option value="sui">SUI</option>
                <option value="core">Core</option>
                <option value="canto">Canto</option>
            </select>
        </div>
        <h1 className="collections-title">New Collections Added</h1>
        <div className="collections-container">
            {currentCollections.map((collection) => (
                <CollectionCard
                    collection={collection}
                    key={collection.id}
                />
            ))}
        </div>
        <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumbers={pageNumbers}
        />
    </div>
    );
};

export default Collections;
