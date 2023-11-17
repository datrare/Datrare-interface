import React from "react";


function Stats({ stats }) {
  return (
    <div className="stats">
      {stats.map((stat, index) => (
        <div key={index}>{`Rank ${index + 1}: ${stat.contractAddress} with marketcap ${stat.marketcap}`}</div>
      ))}
    </div>
  );
}

export default Stats;
