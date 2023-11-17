import React from "react";

function RankSuffix({ selectedItem, data }) {
  const percentage = (selectedItem.rank / data.length) * 100;

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

export default RankSuffix;