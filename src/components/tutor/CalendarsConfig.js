import 'react-big-calendar/lib/css/react-big-calendar.css';
import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import TimePicker from 'react-times';
import { compose } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import BigCalendar from 'react-big-calendar'
import Selectable from './Selectable';
import jspdf from 'jspdf';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';
import * as actions from '../../actions';

const localizer = BigCalendar.momentLocalizer(moment) 

class CalendarsConfig extends Component { 

    componentWillMount() {
        this.props.fetchCalendars(localStorage.getItem('user_id'));
    }

    constructor(props, context){
        super(props, context);

        this.state = {
            modal: false,
        }

        this.renderTimePicker = this.renderTimePicker.bind(this);
        this.openModalReport = this.openModalReport.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    renderTimePicker() {
        return <TimePicker
            theme="classic"
            timeMode="24"
            timeConfig={{
                from: '08:00',
                to: '23:00',
                step: 1,
                unit: 'hour'
            }}
            onTimeChange={this.onTimeChange.bind(this)}
        />;
    }
    
    openModalReport() {
        this.setState({
            modal: true
        })
    }

    generateReport() {
        var doc = new jspdf()

        if(document.getElementById('month').value !== "") {
            axios.get('http://localhost:8000/api/tutorat/'+localStorage.getItem('user_id')+'/'+document.getElementById('month').value)
            .then((response) => {

                var arrayResponse = response.data.filter((obj, pos, arr) => {
                    return arr.map(mapObj => mapObj['dtavailability']).indexOf(obj['dtavailability']) === pos;
                });

                let line = 10;
                doc.text("Tuteur: " + arrayResponse[0].name, 10, line)
                line += 5;
                doc.line(0, line, 1000, line)
                line += 15;
                doc.setFontSize(10);
                doc.setFontStyle('bold');
                doc.text("Date", 10, line)
                doc.text("Heure de début", 45, line)
                doc.text("Heure de fin", 75, line)
                doc.setFontStyle('normal');
                line += 3;
                for(let tutorat of arrayResponse) {
                    line += 8;
                    doc.text(tutorat.dtavailability, 10, line)
                    doc.text(tutorat.hrstart, 50, line)
                    doc.text(tutorat.hrfinish, 75, line)
                }
                line+=5;
                doc.line(0, line, 1000, line)
                line += 20;
                doc.setFontSize(22);
                doc.text("Total d'heures: "+arrayResponse.length, 130, line)
                doc.save('a4.pdf');
            })
        }
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
    }

    render() {

        return (
            <div className="container-fluid h-100">
                <div className="row">
                    <h3 className="mt-3 col-sm-4">
                        Configuration de Calendrier 
                    </h3>
                    <button onClick={this.openModalReport} className="btn btn-primary">
                        Générer Rapport
                    </button>
                </div>
                <div className="mt-3"></div>
                
                <Selectable
                    localizer={localizer}
                />

                <Modal backdrop="static" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Choisissez un mois</ModalHeader>
                    <ModalBody>
                    <form onSubmit={(e)=>{e.preventDefault()}}>
                        <div className="form-group">
                        <input
                            name="month"
                            id="month"
                            type="month"
                            className="form-control"
                            component={this.renderHour}
                            autoComplete="none"
                            />
                        </div>
                        <button onClick={this.generateReport} className="btn btn-primary">
                            Sauvegarder
                        </button>
                    </form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state);
    return { calendars: state.program.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(CalendarsConfig);
  
  