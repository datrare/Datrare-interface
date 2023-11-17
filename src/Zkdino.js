import React, { useState, useEffect, useContext } from "react";
import "./css/Page.css";
import axios from "axios";
import SortButtons from "./components/SortButtons/SortButtons";
import SearchBox from "./components/SearchBox/SearchBox";
import ItemDialog from "./components/ItemDialog/ItemDialog";
import Loader from "./components/Loader/Loader";
import CollectionHeader from "./components/CollectionHeader/CollectionHeader";
import Item from "./components/Item/Item";
import Pagination from "./components/Pagination/Pagination";
import ThemeContext from "./context/ThemeContext";
import Statistic from "./components/Statistic/Statistic";

function Zkdino() {
    const { isDarkMode } = useContext(ThemeContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [imagesPerPage] = useState(30);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("rank");

    useEffect(() => {
        const fetchImages = async () => {
            setLoading(true);
            // const response = await axios.get(
            //     "https://api.datrare.com/zksyncbird"
            // );
            const response = await axios.get(
                "json/metadata_rank_zkdino.json"
            );
            console.log(response.data);
            setData(response.data);
            setLoading(false);
        };

        fetchImages();
    }, []);

    const indexOfLastImage = currentPage * imagesPerPage;
    const indexOfFirstImage = indexOfLastImage - imagesPerPage;

    // filter data based on search term and edition attribute
    const filteredData = data
        .sort((a, b) => a[sortOption] - b[sortOption])
        .filter((image) => {
            if (searchTerm === "") {
                return true;
            }
            return image.edition
                .toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });

    const currentImages = filteredData.slice(
        indexOfFirstImage,
        indexOfLastImage
    );

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredData.length / imagesPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };
    const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const toggleDialog = (item) => {
        console.log(item);
        setSelectedItem(item);
        setIsItemDialogOpen(!isItemDialogOpen);
    };

    return (
        <>
            <ItemDialog
                isOpen={isItemDialogOpen}
                selectedItem={selectedItem}
                toggleDialog={toggleDialog}
            />
            <div
                className={`container ${isDarkMode ? "dark" : "light"} ${
                    isItemDialogOpen ? "dialog-open" : ""
                }`}
            >
                <CollectionHeader
                    dataLength={data.length}
                    imgSrc={
                        "https://firebasestorage.googleapis.com/v0/b/zkmarkets-mainnet/o/collections%2FzkDino%2Fzkdino%20(1).gif?alt=media&token=7c7ade60-c964-491c-b763-a344f457c75a"
                    }
                    collectionId={16}
                    name="zkDino"
                    twitter="https://twitter.com/DatRares"
                    discord="https://t.co/2CNg40NoLE"
                />
                <Statistic contractAddress="0x31c8853c3207aEa9B6D22135aa518d9296622f53" />
                <div className="spacer"></div>
                <div className="main">
                    <div className="search-filter-wrapper">
                        <SearchBox searchHandler={handleSearchChange} />
                        <SortButtons
                            radio={sortOption}
                            setRadio={setSortOption}
                        />
                    </div>
                    <div className="image-grid">
                        {loading ? (
                            <Loader />
                        ) : (
                            currentImages.map((image, index) => (
                                <Item
                                    image={image}
                                    index={index}
                                    toggleDialog={toggleDialog}
                                    data={data}
                                />
                            ))
                        )}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pageNumbers={pageNumbers}
                    />
                </div>
            </div>
        </>
    );
}

export default Zkdino;
