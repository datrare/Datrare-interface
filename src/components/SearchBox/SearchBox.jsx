import "./searchBox.css";

const SearchBox = ({searchHandler}) => {
    return (
        
        <input
            type="text"
            name="text"
            className="input"
            placeholder="Search By Edition Number"
            onChange={searchHandler}
        />
    );
};

export default SearchBox;
