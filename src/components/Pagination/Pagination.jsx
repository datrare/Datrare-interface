import { faSquareCaretLeft, faSquareCaretRight } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import ThemeContext from "../../context/ThemeContext";
import "./pagination.css";


const MAX_PAGE_BUTTONS = 5;

const Pagination = ({ currentPage, setCurrentPage, pageNumbers }) => {
  const { isDarkMode } = useContext(ThemeContext);

  const startPage = Math.max(currentPage - Math.floor(MAX_PAGE_BUTTONS / 2), 1);
  const endPage = Math.min(startPage + MAX_PAGE_BUTTONS - 1, pageNumbers.length);

  const renderPageNumbers = [];

  if (startPage > 1) {
    renderPageNumbers.push(
      <button key="start-dots" className="dots" disabled>
        ...
      </button>
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    renderPageNumbers.push(
      <button
        key={i}
        className={`${isDarkMode ? "dark" : "light"} ${
          currentPage === i ? "active" : ""
        }`}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </button>
    );
  }

  if (endPage < pageNumbers.length) {
    renderPageNumbers.push(
      <button key="end-dots" className="dots" disabled>
        ...
      </button>
    );
  }

  return (
    <div className="pagination">
      <button
        onClick={() =>
          setCurrentPage((prevPage) =>
            prevPage === 1 ? prevPage : prevPage - 1
          )
        }
      >
        <FontAwesomeIcon
          icon={faSquareCaretLeft}
          size="2xl"
          style={{ color: "#faa619" }}
        />
      </button>
      {renderPageNumbers}
      <button
        onClick={() =>
          setCurrentPage((prevPage) =>
            prevPage === pageNumbers.length ? prevPage : prevPage + 1
          )
        }
      >
        <FontAwesomeIcon
          icon={faSquareCaretRight}
          size="2xl"
          style={{ color: "#faa619" }}
        />
      </button>
    </div>
  );
};


export default Pagination;
