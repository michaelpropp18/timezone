import React from 'react';
import axios from 'axios';

class AddCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: '',
            error: false
        }
        this.editCity = this.editCity.bind(this);
        this.createCity = this.createCity.bind(this);
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
    createCity() {
        console.log(this.state.city);
    }
    editCity(e) {
        this.setState({city: e.target.value});
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.city} onChange={this.editCity}/>
                <button onClick={this.createCity}>Add City</button>
            </div>
        )
    }
}
export default AddCity;