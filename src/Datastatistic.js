import React, { useState, useEffect } from 'react';
import './css/Datastatistic.css';

function Datastatistic() {
  const [totalNFT, setTotalNFT] = useState(0);
  const [totalCollections, setTotalCollections] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.datrare.com/collections_data');
      const data = await response.json();
      setTotalNFT(data.length);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.datrare.com/collections');
      const data = await response.json();
      setTotalCollections(data.length);
    };
    fetchData();
  }, []);

  return (
    <div className="data-container">
      <h2 className="data-title">Data Statistics</h2>
      <div className="data-box">
        <div className="data-box-header">
          <h3 className="data-box-title">Total NFT</h3>
        </div>
        <div className="data-box-content">
          <h2 className="data-box-value">{totalNFT}</h2>
        </div>
      </div>
      <div className="data-box">
        <div className="data-box-header">
          <h3 className="data-box-title">Total Collections</h3>
        </div>
        <div className="data-box-content">
          <h2 className="data-box-value">{totalCollections}</h2>
        </div>
      </div>
    </div>
  );
}

export default Datastatistic;
