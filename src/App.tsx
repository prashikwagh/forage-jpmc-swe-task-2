import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

/**

 */
interface IState {
  data: DataPoint[];
  showGraph: boolean;  // Add this line
}


/**
 * The parent element of the react app.
 * It renders title, button and Graph react element.
 */
class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false  // Initialize showGraph
    };
  }
  // Other constructor code...
}


  /**
   * Render Graph react component with state.data parse as property data
   */
renderGraph() {
  if (this.state.showGraph) {
    return (
      <div className="graph-container">
        <Graph data={this.state.data} />
      </div>
    );
  } else {
    return null;  // Render nothing if showGraph is false
  }
}


  /**
   * Get new data from server and update the state with the new data
   */
getDataFromServer() {
  setInterval(() => {
    fetch('server-url')  // Replace 'server-url' with your actual server endpoint
      .then(response => response.json())
      .then(data => {
        this.setState({
          data: data,
          showGraph: true  // Show graph once data is fetched
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }, 5000);  // Fetch data every 5 seconds (adjust as needed)
}


  /**
   * Render the App react component
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank & Merge Co Task 2
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button"
            // when button is click, our react app tries to request
            // new data from the server.
            // As part of your task, update the getDataFromServer() function
            // to keep requesting the data every 100ms until the app is closed
            // or the server does not return anymore data.
            onClick={() => {this.getDataFromServer()}}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
