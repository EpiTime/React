import React from 'react';
import '../styles/App.css';
import Navbar from './Navbar';
import Timeline from './Timeline';

interface Props {
}

interface State {
    year?: string;
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            year: "2022"
        }
    }

    callbackData = (year_value?: string) => {
        this.setState({year: year_value})
    }

    render() {
        return (
            <div className="App">
                <Navbar callback={this.callbackData}/>

                <div id="main_wrapper">
                    <Timeline year={this.state.year}/>
                    <p>{this.state.year}</p>
                </div>
            </div>
        );
    }
}

export default App;
