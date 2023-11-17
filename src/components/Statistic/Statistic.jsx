import React from "react";
import "./Statistic.css";

class Statistic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floorPrice: null,
      totalVolume: null,
      numItems: null,
      owners: null,
      ethPrice: null, // Add ethPrice to state
      ethPriceLastFetched: null, // Add ethPriceLastFetched to state
      loading: true,
      error: null,
    };
  }

  componentDidMount() {


    if (!this.props.contractAddress) {
        this.setState({
          error: "Marketplace is not supported",
          loading: false,
        });
        return;
      }
    // Make API call to retrieve data
    fetch(`https://api.mintsquare.io/v0/collection/zksync-mainnet/${this.props.contractAddress}`)
      .then((response) => response.json())
      .then((data) => {
        // Update state with data from API response
        this.setState({
          floorPrice: data.stats.floor_price / 10 ** 18, // Convert to Ether
          totalVolume: data.stats.total_volume / 10 ** 18,
          owners: data.stats.num_owners,
          numItems: data.stats.num_items,
          loading: false,
        });
  
        const cachedEthPrice = localStorage.getItem('cachedEthPrice');
        const cachedTime = localStorage.getItem('cachedTime');
        const currentTime = new Date().getTime();
  
        if (cachedEthPrice && cachedTime && (currentTime - cachedTime < 6 * 60 * 60 * 1000)) {
          this.setState({ ethPrice: cachedEthPrice });
        } else {
          fetch("https://api.api-ninjas.com/v1/cryptoprice?symbol=ETHUSD", {
            headers: { 'X-Api-Key': '21cHxq55QajzzUmsXeFRFQ==vmu13kFiFZMPFyCL'}
          })
            .then((response) => response.json())
            .then((data) => {
              // Update state with ETH price
              this.setState({ ethPrice: data.price });
  
              // Cache ETH price and time
              localStorage.setItem('cachedEthPrice', data.price);
              localStorage.setItem('cachedTime', currentTime.toString());
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        // Update state with error message
        this.setState({
          error: error.message,
          loading: false,
        });
      });
  }
  

  render() {
    const { numItems, owners, floorPrice, totalVolume, loading, error, ethPrice } = this.state;

    return (
      <div className="statistic-box">
        
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">Error: {error}</p>}
          {!loading && !error && (
            <div className="statistic-values">

<div className="statistic-value">
  <h3 className="statistic-number">{(owners < 1000 ? owners : (owners / 1000).toFixed(1) + "K")}</h3>
  <span className="statistic-text">Holders</span>
</div>


              
<div className="statistic-value">
  <div className="number-wrapper">
    <h3 className="statistic-number">
      {floorPrice < 0.001 ? "< 0.001" : floorPrice.toFixed(3)} ETH
    </h3>
    <span className="statistic-text">Floor price</span>
  </div>
</div>


<div className="statistic-value">
  
  <div className="number-wrapper">
    <h3 className="statistic-number">{totalVolume.toFixed(1)} ETH</h3>
    <span className="statistic-text">Total volume</span>
  </div>
</div>





              <div className="statistic-value">
                {ethPrice && (
                  <h3 className="statistic-number">
                    ${(numItems * floorPrice * ethPrice).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}
                  </h3>
                )}
                {!ethPrice && (
                  <h3 className="statistic-number">n/a</h3>
                )}
                <span className="statistic-text">Market cap</span>
              </div>

            
            </div>
          )}
        
      </div>
    );
  }
}

export default Statistic;