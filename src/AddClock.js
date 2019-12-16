import React from 'react';
import axios from 'axios';

class AddClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            city: '',
            error: false,
            id: 0
        }
        this.getOffset = this.getOffset.bind(this);
        this.editCity = this.editCity.bind(this);
        this.createCity = this.createCity.bind(this);
    }
    getOffset() {
        let localOffset = 0;
        return axios.get(`http://worldtimeapi.org/api/ip`)
        .then(res => {
          localOffset = res.data.raw_offset / 3600;
          return axios.get(`http://worldtimeapi.org/api/timezone/${this.state.url}`);
        })
        .then(res => {
          return res.data.raw_offset / 3600 - localOffset
        })
        .catch(err => {
            this.setState({error: true})
        })
    }
    getUrl() {
        return axios.get(`http://worldtimeapi.org/api/timezone`)
        .then(res => {
            res.data.some(cityUrl => {
                const match = cityUrl.includes(this.state.city)
                if (match) {
                    this.setState({url: cityUrl});
                }
                return match
            })
            if (this.state.url === '') {
                this.setState({error: true})
            }
        })
    }
    createCity() {
        this.getUrl()
        .then(() => {
            return !this.state.error ? this.getOffset() : this.setState({error: true})
        })
        .then(res => {
            if (!this.state.error) {
                this.setState(state => ({id: state.id + 1}));
                this.props.onSubmit({
                    city: this.state.city, 
                    offset: res,
                    id: this.state.id
                });
            } 
        })
    }
    editCity(e) {
        this.setState({
            city: e.target.value,
            error: false
        });
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
export default AddClock;