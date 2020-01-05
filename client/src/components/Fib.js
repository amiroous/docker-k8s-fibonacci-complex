import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {

    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({values: values.data});
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({seenIndexes: seenIndexes.data});
    }

    renderSeenIndexes() {
        if(!this.state.seenIndexes) {
            return '';
        }
        return this.state.seenIndexes.map(({number}) => number).join(', ');
    }

    renderCalculatedValues() {
        const entries = [];
        const values = this.state.values;

        for(let key in values) {
            entries.push(
                <div key={key}>
                    For Index {key} Result is Calculated as {values[key]}
                </div>
            )
        }

        return entries;
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('/api/values', {
            index:  this.state.index
        });

        this.setState({index: ''});

        setTimeout(() => window.location.reload(true), 700);
    };

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter Index:</label>
                    <input type="text" value={this.state.index} onChange={e => this.setState({index: e.target.value})}/>
                    <button>Submit</button>
                </form>

                <h3>Seen Indexes:</h3>
                {this.renderSeenIndexes()}

                <h3>Calculated Values:</h3>
                {this.renderCalculatedValues()}
            </div>
        );
    }
}

export default Fib;