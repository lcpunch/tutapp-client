import React from 'react'
import BigCalendar from 'react-big-calendar'
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import 'rc-time-picker/assets/index.css';

const propTypes = {}
const now = moment().hour(12).minute(0);

function onChange(value) {
  value.format("HH:mm");
}

function generateOptions(length, excludedOptions) {
  const arr = [];
  for (let value = 0; value < length; value++) {
    if (excludedOptions.indexOf(value) < 0) {
      arr.push(value);
    }
  }
  return arr;
}

function disabledMinutes(h) {
  return generateOptions(60, [0]);
}

function disabledHours() {
  return [0, 1, 2, 3, 4, 5, 6, 22, 23];
}

let events=[];

class Selectable extends React.Component {

  constructor(...args) {
    super(...args)

    this.state = {
      selectedDate: "",
      events,
      modal: false,
      modalSelect: false
    }

    this.toggle = this.toggle.bind(this);
    this.toggleSelect = this.toggleSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.id) {
      this.props.fetchCalendars(this.props.id);
    } else {
      this.props.fetchCalendars(localStorage.getItem('user_id'));
    }
  }

  handleSelect = ({ start, end }) => {
    if(!this.props.id) {
      this.setState({
        selectedDate: moment(start).format("MM/DD/YYYY"),
        modal: true
      });
    }
  }

  handleSelectEvent = (event) => {
    this.setState({
      selectedDate: event,
      modalSelect: true
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleSelect() {
    this.setState({
      modalSelect: !this.state.modalSelect
    });
  }

  onSubmitDelete = () => {
    
    this.setState({ modalSelect: false });
    this.props.deleteCalendar(this.state.selectedDate);
  };

  onSubmit = () => {
    const time = document.getElementById('time').value;
    const event = {
      start: new Date(moment(this.state.selectedDate).add(parseInt(time.substring(0, 2)), 'hours').format('YYYY-MM-DD HH:mm')),
      end: new Date(moment(this.state.selectedDate).add(parseInt(time.substring(0, 2))+1, 'hours').format('YYYY-MM-DD HH:mm')),
      title: 'tutorat'
    }

    this.setState({ modal: false });
    this.props.saveCalendar(event);
  };

  renderHour() {
    return <TimePicker
              showSecond={false}
              id="time"
              defaultValue={now}
              className="xxx"
              onChange={onChange}
              disabledHours={disabledHours}
              disabledMinutes={disabledMinutes}
            />;
  }

  eventStyleGetter(event) {
    var backgroundColor = '#66a3ff';

    if(event.count >= 1) {
      backgroundColor = '#00b300';
    }
    var style = {
        backgroundColor: backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'black',
        border: '0px',
        textAlign: 'center',
        fontSize: '0.8em',
        display: 'block'
    };
    return {
        style: style
    };
  }

  render() {
    const { localizer } = this.props
    const { handleSubmit } = this.props;

    return (
      <div>
        <BigCalendar
          selectable
          style={{height: '900px'}}
          views={{month: true}}
          localizer={localizer}
          events={this.props.events}
          defaultView={BigCalendar.Views.MONTH}
          defaultDate={new Date()}
          onSelectEvent={event => this.handleSelectEvent(event)}
          onSelectSlot={this.handleSelect}
          eventPropGetter={(this.eventStyleGetter)}
        />
        <Modal backdrop="static" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Choisissez une heure de début</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <div className="form-group">
                  <Field
                    name="hrfinish"
                    className="form-control"
                    component={this.renderHour}
                    autoComplete="none"
                    />
                </div>
                <button className="btn btn-primary">
                  Sauvegarder
                </button>
              </form>
            </ModalBody>
        </Modal>
        <Modal backdrop="static" isOpen={this.state.modalSelect} toggle={this.toggleSelect} className={this.props.className}>
          <ModalHeader toggle={this.toggleSelect}>Voulez-vous supprimer le tutorat?</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(this.onSubmitDelete)}>
                <div className="form-group">
                  
                </div>
                <button className="btn btn-primary mr-3">
                  Oui
                </button>
                <button type="button" onClick={()=>this.setState({ modalSelect: false })} className="btn btn-secondary">
                  Non
                </button>
              </form>
            </ModalBody>
        </Modal>
      </div>
    )
  }
}

Selectable.propTypes = propTypes

function mapStateToProps(state) {

  let eventObject;
  const localevents=[];
  
  for(let event in state.calendar.data) {
    
    eventObject = {};

    let dtstart = new Date(moment(state.calendar.data[event].dtavailability).format("MM/DD/YYYY"));
    let dtend = new Date(dtstart);
    let title;

    if(state.calendar.data[event])
      title = state.calendar.data[event].hrstart.slice(0, 2) + " - " + state.calendar.data[event].hrfinish.slice(0, 2);
    
    let id = state.calendar.data[event].id;
    eventObject["start"] = dtstart;
    eventObject["end"] = dtend;
    eventObject["title"] = title;
    eventObject["id"] = id;
    localevents.push(eventObject);
  }
  return { events: localevents };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form:'signin' })
)(Selectable);

