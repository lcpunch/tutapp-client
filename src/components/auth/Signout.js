import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {

    componentDidMount() {
        this.props.signout();
    }

    render() {
        return (
            <div className="container">
                <div className="row mt-3">
                    <div className="col-sm">
                    
                    </div>
                    <div className="col-sm">
                        Merci d'avoir utilisé notre système.
                    </div>
                    <div className="col-sm">
                    
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, actions)(Signout);