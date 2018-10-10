import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {

    componentDidMount() {
        this.props.signout();
    }

    render() {
        return <div>Merci d'avoir utilisé notre système! Voilà une patate.
            <div><img src="https://c1.staticflickr.com/1/100/287968353_a0c14b44c1_z.jpg?zz=1" alt="Smiley face" /></div>
        </div>
    }
}

export default connect(null, actions)(Signout);