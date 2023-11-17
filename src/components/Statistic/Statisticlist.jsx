import React from "react";
import Statistic from "./Statistic";

class StatisticList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ["0x3524452c8ffb81f11b066ad9a991005cc42587bc","0x5e6f0f1d604d7300c10933aa8834afa034d448ea","0xcb5d99e8b5d626f882e1fb4067d37759d67595a6"], // Add data array to state
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    // Make API call to retrieve data
    fetch("https://api.mintsquare.io/v0/collections/zksync-mainnet")
      .then((response) => response.json())
      .then((data) => {
        // Update state with data from API response
        this.setState({
          data: data.collections,
          loading: false,
        });
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
    const { data, loading, error } = this.state;

    // Sort data by totalVolume in descending order
    const sortedData = data.sort((a, b) => b.stats.total_volume - a.stats.total_volume);

    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && !error && (
          <div>
            <h2>Statistics</h2>
            <ul>
              {sortedData.map((item, index) => (
                <li key={item.contract_address}>
                  <Statistic contractAddress={item.contract_address} rank={index + 1} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default StatisticList;
