import { useState } from 'react';
import "./collectionDescription.css"

const CollectionDescription = ({ description }) => {
  const maxLength = 150; // Maximum length of description before adding "Read More"
  const [expanded, setExpanded] = useState(false);

  const handleReadMoreClick = () => {
    setExpanded(true);
  };

  const formatDescription = () => {
    if (description.length <= maxLength || expanded) {
      return description;
    }
    const shortenedDescription = description.substring(0, maxLength);
    return (
      <>
        {shortenedDescription}...
        <span className="read-more" onClick={handleReadMoreClick}>
          Read More
        </span>
      </>
    );
  };

  return (
    <div className="collection-description">
      <h3 className="description-heading"></h3>
      <p className="description-text">{formatDescription()}</p>
    </div>
  );
};

export default CollectionDescription;
