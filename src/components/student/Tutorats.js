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
        openDelete: false,
        calendar: {}
    };

    constructor(props, context) {
        super(props, context);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClickOpenDelete = this.handleClickOpenDelete.bind(this);
        this.handleCloseDelete = this.handleCloseDelete.bind(this);
        this.renderTutorats = this.renderTutorats.bind(this);
        this.renderConfirmButton = this.renderConfirmButton.bind(this);
    }

    componentDidMount() {
         this.props.fetchTutorats();
    }

    handleClickOpen(calendar) {
        this.setState({ open: true, calendar });
    }

    handleClickOpenDelete(calendar) {
        this.setState({ openDelete: true, calendar });
    }

    handleClose() {
        this.setState({ open: false });
    }

    handleCloseDelete() {
        this.setState({ openDelete: false });
    }

    saveTutorat() {
        this.setState({ open: false });
        this.props.confirmTutorat(this.state.calendar);
    }

    deleteTutorat() {
        this.setState({ openDelete: false });
        this.props.deleteTutorat(this.state.calendar);
    }

    renderConfirmButton(tutorat) {
        if(tutorat.status === 0) {
            return (
                <div className="px-3 row justify-content-between">
                    <button className="col-3 btn btn-primary" onClick={() => this.handleClickOpen(tutorat)}>Confirmer</button>
                    <button className="col-3 btn btn-danger" onClick={() => this.handleClickOpenDelete(tutorat)}>Annuler</button>
                </div>
            );
        } 
        return (
            <div className="px-3 row justify-content-between">
                <button disabled className="col-3 btn btn-secondary" onClick={() => this.handleClickOpen(tutorat)}>Confirmé</button>
            </div>
        );
    }

    renderTutorats(tutorat) {
        return(
            <div className="list-group-item list-group-item-action card card-block mt-1" key={tutorat.id}>
                <h4 className="card-title">{tutorat.name}</h4>
                <p className="card-text">Date:<Moment format="DD/MM/YYYY">{tutorat.dtavailability}</Moment></p>
                <p className="card-text">Horaire:{tutorat.hrstart + ' - ' + tutorat.hrfinish}</p>
                {this.renderConfirmButton(tutorat)}
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
                            <Button onClick={() => this.saveTutorat()} color="primary" autoFocus>
                                Oui
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={this.state.openDelete}
                        onClose={this.handleCloseDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Réservation"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Voulez-vous annuler le tutorat?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseDelete} color="primary">
                                Non
                            </Button>
                            <Button onClick={() => this.deleteTutorat()} color="primary" autoFocus>
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
    console.log(state.program.data);
    return { tutorats: state.program.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(Tutorats);
  
  