import '../styles/Navbar.css';
import logo from '../images/logo.png'
import profile_logo from '../images/profile.png'
import React from "react";

class Navbar extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            year: "2022"
        }
        this.handleChange = this.handleChange.bind(this);
    }

    updateData = () => {
        this.props.callback(this.state.year);
    }

    handleChange = (event: any) => {
        this.setState({year: event.currentTarget.value});
        console.log("state: " + event.currentTarget.value);
        this.updateData();
    }

    render() {
        return (
            <nav id="main_nav">
                <div id="logo_container">
                    <img src={logo} alt="Project logo"/>
                    <h1>EPITIME</h1>
                </div>

                <div id="connection_container">
                    <select name="years" id="years" value={this.state.year} onChange={this.handleChange}>
                        <option value="2022">2022</option>
                        <option value="2022">2023</option>
                        <option value="2022">2024</option>
                        <option value="2022">2025</option>
                        <option value="2022">2026</option>
                    </select>
                    <p>{this.state.year}</p>
                    <img src={profile_logo} alt="Profile picture"/>
                </div>
            </nav>
        );
    }
}

interface Props {
    callback: (value?: string) => void
}

interface State {
    year?: string;
}

export default Navbar;