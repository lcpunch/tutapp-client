import React from 'react'
import BigCalendar from 'react-big-calendar'
import { reduxForm } from 'redux-form';
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
      selectedCalendar: "",
      events,
      modal: false
    }

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    
    this.props.fetchCalendars(this.props.id);
  }

  handleSelect = (event) => {
    this.setState({
      selectedCalendar: event,
      modal: true
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onSubmit = () => {
      this.setState({ modal: false });
      this.props.saveTutorat(this.state.selectedCalendar);
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
          onSelectEvent={event => this.handleSelect(event)}
          
        />
        <Modal backdrop="static" isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Voulez-vous réserver le tutorat?</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <button className="btn btn-primary mr-2">
                  Oui
                </button>
                <button type="button" onClick={()=>this.setState({ modal: false })} className="btn btn-danger">
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

  for(let event in state.program.data) {
    eventObject = {};
    let dtstart = new Date(moment(state.program.data[event].dtavailability).format("MM/DD/YYYY"));
    let dtend = new Date(dtstart);
    let title = "Tutorat à donner";
    let id = state.program.data[event].id;
    eventObject["start"] = dtstart;
    eventObject["end"] = dtend;
    eventObject["title"] = title;
    eventObject["id"] = id;
    eventObject["user_id"] = state.program.data[event].user_id;
    localevents.push(eventObject);
  }

  return { events: localevents };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form:'signin' })
)(Selectable);

