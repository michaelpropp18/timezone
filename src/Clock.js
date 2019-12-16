import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            continent: 'Europe',
            city: props.city,
            time: new Date(),
            offset: parseInt(props.offset),
        }
    }
    componentDidMount() {
        this.timer = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    tick() {
        this.setState(() => {
            let newTime = new Date();
            newTime.setHours(newTime.getHours() + this.state.offset)
            return {time: newTime}
        })
    }
    render() {
        return (
            <div>
                <h1>{this.state.city}</h1>
                <p>{this.state.time.toLocaleTimeString()}</p>
            </div>
        )
    }
}
export default Clock;