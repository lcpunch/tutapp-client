import React, { Component } from 'react';
import requireAuth from './requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as actions from '../actions';

import './ProgramStyle.css';

class Hours extends Component { 

    state = {
        open: false,
        calendar: {}
    };

    constructor(props, context){
        super(props, context);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.renderHours = this.renderHours.bind(this);
    }

    componentWillMount() {
        this.props.fetchHours(this.props.match.params.id, this.props.match.params.date);
    }

    handleClickOpen(calendar) {
        this.setState({ open: true, calendar });
    }

    handleClose() {
        this.setState({ open: false });
    }

    saveTutorat() {
        this.setState({ open: false });
        this.props.saveTutorat(this.state.calendar);
    }

    renderHours(calendar) {
        return(
            <div className="row mt-1" key={calendar.id}>
                <div
                    className="col">
                    {calendar.hrstart.slice(0, -3) +" - "+calendar.hrfinish.slice(0, -3)}
                </div>
                <div className="col text-right">
                    <button className="btn btn-primary" onClick={() => this.handleClickOpen(calendar)}>Réserver</button>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">{"Réservation"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Voulez-vous confirmer la réservation?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Non
                            </Button>
                            <Button onClick={() => this.saveTutorat(calendar)} color="primary" autoFocus>
                                Oui
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }

    
    renderTutor = () => {
        return(
            <div>
                <p>Tuteur: {this.props.calendars[0].name}</p>
                <p>Date: <Moment format="DD/MM/YYYY">{this.props.calendars[0].dtavailability}</Moment></p>
            </div>
        );
    }

    render() {
        if (this.props.calendars.length === 0) {
            return <div>Il n'a plus de heures disponibles</div>;
        }
        return (
            <div className="container">
                <h3 className="mt-3">Horaires disponibles</h3>
                {this.renderTutor()}
                <div className="list-group mt-3">
                    {this.props.calendars.map(this.renderHours)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { calendars: state.program.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(Hours);
  
  