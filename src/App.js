import React from 'react';
import './App.css';
import Clock from './Clock.js';
import AddCity from './AddCity.js';

import axios from 'axios';

class App extends React.Component {
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
    console.log(clockData.city);
  }
  render() {
    this.getOffset('Europe', 'London')
    return (
      <div className="App">
        <h1>World Clock</h1>
        <AddCity onSubmit={this.createClock} />
        <Clock city="Atlanta" offset='0'/>
        <Clock city="London" offset='5'/>
        <Clock city="Chicago" offset='-1'/>
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
