import React from 'react';
import './App.css';
import Clock from './Clock.js';
import AddClock from './AddClock.js';

import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clocks: [],
    }
    this.createClock = this.createClock.bind(this);
  }
  getOffset(continent, city) {
    let localOffset = 0;
    return axios.get(`http://worldtimeapi.org/api/ip`)
    .then(res => {
      localOffset = res.data.raw_offset / 3600;
      return axios.get(`http://worldtimeapi.org/api/timezone/${continent}/${city}`);
    })
    .then(res => {
      return res.data.raw_offset / 3600 - localOffset
    })
  }
  createClock(clockData) {
    this.setState(state => ({
      clocks: [clockData, ...state.clocks],
    }));
  }
  render() {
    this.getOffset('Europe', 'London')
    return (
      <div className="App">
        <h1>World Clock</h1>
        <AddClock onSubmit={this.createClock} />
        {this.state.clocks && this.state.clocks.map(clock =>
           <Clock key={clock.id}
           city={clock.city} 
           offset={clock.offset}/>
        )}
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;
