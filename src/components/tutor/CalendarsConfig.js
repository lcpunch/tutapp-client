import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { reduxForm, Field } from 'redux-form';
import TimePicker from 'react-times';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import * as actions from '../../actions';
import 'react-times/css/classic/default.css';

import '../student/ProgramStyle.css';

class CalendarsConfig extends Component { 

    componentWillMount() {
        this.props.fetchCalendars(localStorage.getItem('user_id'));
    }

    renderCalendar(calendar) {
        return(
            <Link to={"/calendar/" + calendar.user_id + "/" + calendar.dtavailability} key={calendar.id}>
                <div className="list-group-item list-group-item-action card card-block mt-1" key={calendar.id}>
                    <Moment format="DD/MM/YYYY">
                        {calendar.dtavailability}
                    </Moment>
                </div>
            </Link>
        );
    }

    render() {
        return (
            <div className="container">
                <h3 className="mt-3">Configuration de Calendrier</h3>
                <button 
                    className="btn btn-primary mt-2"
                    data-toggle="modal"
                    data-target="#addCalendar"    
                >Ajouter un nouveau horaire</button>
                <div className="modal" id="addCalendar">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Horaire</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>Date</label>
                                        <Field
                                        name="date"
                                        className="form-control"
                                        type="date"
                                        component="input"
                                        placeholder="Entrez la date"
                                        autoComplete="none"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Heure de début</label>
                                        <TimePicker theme="classic"/>
                                    </div>
                                    <div className="form-group">
                                        <label>Heure de fin</label>
                                        <TimePicker theme="classic"/>
                                    </div>
                                    <div>
                                        {this.props.errorMessage}
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Sauvegarder</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="list-group mt-3">
                    {this.props.calendars.map(this.renderCalendar)}
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
    requireAuth,
    reduxForm({ form:'calendar' })
)(CalendarsConfig);
  
  