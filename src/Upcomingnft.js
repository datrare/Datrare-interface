import React, { useState, useEffect } from "react";
import "./css/Upcoming.css";
import { FaGlobe, FaDiscord, FaTwitter } from "react-icons/fa";

const Upcomingnft = () => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    fetch("https://api.datrare.com/upcomingnft")
      .then((response) => response.json())
      .then((data) => setNfts(data))
      .catch((error) => console.log(error));
  

      const intervalId = setInterval(() => {
        // Update countdown time for each NFT
        setNfts((prevNfts) => {
          return prevNfts.map((nft) => {
            const countdownTime = getCountdownTime(nft.start_date, new Date());
            return { ...nft, countdownTime };
          });
        });
      }, 1000);
  
      // Clear interval when component unmounts
      return () => clearInterval(intervalId);
    }, []);

  const getCountdownTime = (startDate) => {
    const countdownDate = new Date(startDate).getTime();
    const now = new Date().getTime();
    const difference = countdownDate - now;
  
    let countdownTime = {};
  
    if (difference > 0) {
      countdownTime = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    } else {
      countdownTime = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        mintingNow: true,
      };
    }
  
    return countdownTime;
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const formatTimeString = (dateString) => {
    const date = new Date(dateString);
    const options = { hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
    return date.toLocaleTimeString('en-US', options);
  }

  return (
    

    <div className="upcoming-nft-container">
        <br></br>
        
  <div className="upcoming-container-top">
    <h2 className="upcoming-title">Upcoming NFT Mint</h2>
    <p className="upcoming-text disclaimer">Disclaimer: The information provided on this platform, including any reviews, opinions, recommendations, or advice, is solely for informational purposes. It is not intended to be and should not be construed as financial, legal, or investment advice. We do not guarantee the accuracy, completeness, or reliability of any information presented. You should always do your own research and consult with a qualified professional before making any investment decision. By using this platform, you agree that we will not be held liable for any losses or damages arising from the use of the information provided.</p>
    <p className="upcoming-text warning">Warning: The information provided on this platform is subject to change without notice. While we strive to keep the information up-to-date, we do not guarantee that the information provided is accurate or complete. It is your responsibility to verify any information, such as sale dates, prices, and supply, with official project channels. We will not be held responsible for any missed opportunities or losses resulting from inaccurate information.</p>
    <p className="upcoming-text notice">Notice: Listed on upcoming NFT page doesnt mean we also list the rarity of the project ranking , We provide this information as a free service, and we do not receive any compensation for including or excluding projects from our listings. The information we provide is based on our own research and analysis, and we encourage you to conduct your own due diligence before making any investment decision.</p>
    <p className="upcoming-text submit"><a href="https://forms.gle/mjZ5rsq4rqTjU1b28" target="_blank" rel="noopener noreferrer">Submit your project for this list</a></p>
  </div>







       <h2>Live Minting</h2>
       <div className="upcoming-nfts">
  {nfts.map((nft) => {
    const countdownTime = getCountdownTime(nft.start_date, nft.end_date);
    if (!countdownTime.mintingNow) {
      return null; // Skip rendering this NFT
    }
    return (
      <div key={nft.id} className="upcoming-nft">
        <div className="nft-image">
          <img src={nft.showcase} alt={nft.nft_name} />
        </div>
        <div className="nft-details">
          <h3>{nft.nft_name}</h3>
          <p>Chain: {nft.chain}</p>
          <p>Price: {nft.price}</p>
          <p>Total Supply: {nft.total_supply}</p>
          <div className="nft-links">
            {nft.website && <a href={nft.website}><FaGlobe /></a>}
            {nft.discord && <a href={nft.discord}><FaDiscord /></a>}
            {nft.twitter && <a href={nft.twitter}><FaTwitter /></a>}
          </div>
        </div>
      </div>
    );
  })}
</div>



<h2>Upcoming Mint</h2>
      <div className="upcoming-nfts">
        {nfts
          .sort((a, b) => {
            if (a.start_date < b.start_date) return -1;
            if (a.start_date > b.start_date) return 1;
            return 0;
          })
          .map((nft) => {
            const countdownTime = getCountdownTime(nft.start_date);
            if (countdownTime.mintingNow) {
              return null;
            }
            return (
              <div key={nft.id} className="upcoming-nft">
                <div className="nft-image">
                  {nft.start_date && (
                    <p>
                      {`Minting in : ${countdownTime.days}D ${countdownTime.hours}H ${countdownTime.minutes}M ${countdownTime.seconds}S`}
                    </p>
                  )}
                  <img src={nft.showcase} alt={nft.nft_name} />
                </div>
                <div className="nft-details">
                  <h3>{nft.nft_name}</h3>
                  {nft.start_date && (
                    <p>
                      Start Date: {formatDateString(nft.start_date)} at {formatTimeString(nft.start_date)}
                    </p>
                  )}
                  <p>Chain: {nft.chain}</p>
                  <p>Price: {nft.price}</p>
                  <p>Total Supply: {nft.total_supply}</p>
          <div className="nft-links">
            {nft.website && <a href={nft.website}><FaGlobe /></a>}
            {nft.discord && <a href={nft.discord}><FaDiscord /></a>}
            {nft.twitter && <a href={nft.twitter}><FaTwitter /></a>}
          </div>
        </div>
      </div>


    );
})}

      </div>
    </div>
  );
};

export default Upcomingnft;
