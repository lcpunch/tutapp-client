import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as actions from '../../actions';

import './ProgramStyle.css';

//TODO: precisamos mostrar o curso.

class Tutorats extends Component { 

    state = {
        open: false,
        calendar: {}
    };

    constructor(props, context){
        super(props, context);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderTutorats = this.renderTutorats.bind(this);
    }

    componentDidMount() {
         this.props.fetchTutorats();
    }

    handleClickOpen(calendar) {
        this.setState({ open: true, calendar });
    }

    handleClose() {
        this.setState({ open: false });
    }

    saveTutorat() {
        this.setState({ open: false });
        //TODO: mudar o status
        this.props.confirmTutorat(this.state.calendar);
    }

    renderTutorats(tutorat) {
        return(
            <div className="list-group-item list-group-item-action card card-block mt-1" key={tutorat.id}>
                <h4 className="card-title">{tutorat.name}</h4>
                <p className="card-text">Date:<Moment format="DD/MM/YYYY">{tutorat.dtavailability}</Moment></p>
                <p className="card-text">Horaire:{tutorat.hrstart + ' - ' + tutorat.hrfinish}</p>
                <button className="btn btn-primary" onClick={() => this.handleClickOpen(tutorat)}>Confirmer</button>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Réservation"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Voulez-vous confirmer le tutorat?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Non
                            </Button>
                            <Button onClick={() => this.saveTutorat(tutorat)} color="primary" autoFocus>
                                Oui
                            </Button>
                        </DialogActions>
                    </Dialog>
            </div>
        );
    }

    render() {
        if (this.props.tutorats.length === 0) {
            return <div>Il n'a plus de tutorats</div>;
        }
        return (
            <div className="container">
                <h3 className="mt-3">Mes tutorats</h3>
                <p>Liste de tutorats à confirmer</p>
                <div className="list-group">
                    {this.props.tutorats.map(this.renderTutorats)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { tutorats: state.program.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(Tutorats);
  
  