import React from 'react'
import BigCalendar from 'react-big-calendar'
import TextField from "@material-ui/core/TextField";
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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


/*const events = [
    {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2015, 3, 7),
      end: new Date(2015, 3, 10),
    },
  
    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(2016, 2, 13, 0, 0, 0),
      end: new Date(2016, 2, 20, 0, 0, 0),
    },
  
    {
      id: 3,
      title: 'DTS ENDS',
      start: new Date(2016, 10, 6, 0, 0, 0),
      end: new Date(2016, 10, 13, 0, 0, 0),
    },
  
    {
      id: 4,
      title: 'Some Event',
      start: new Date(2015, 3, 9, 0, 0, 0),
      end: new Date(2015, 3, 10, 0, 0, 0),
    },
    {
      id: 5,
      title: 'Conference',
      start: new Date(2015, 3, 11),
      end: new Date(2015, 3, 13),
      desc: 'Big conference for important people',
    },
    {
      id: 6,
      title: 'Meeting',
      start: new Date(2015, 3, 12, 10, 30, 0, 0),
      end: new Date(2015, 3, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
      id: 7,
      title: 'Lunch',
      start: new Date(2015, 3, 12, 12, 0, 0, 0),
      end: new Date(2015, 3, 12, 13, 0, 0, 0),
      desc: 'Power lunch',
    },
    {
      id: 8,
      title: 'Meeting',
      start: new Date(2015, 3, 12, 14, 0, 0, 0),
      end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
      id: 9,
      title: 'Happy Hour',
      start: new Date(2015, 3, 12, 17, 0, 0, 0),
      end: new Date(2015, 3, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day',
    },
    {
      id: 10,
      title: 'Dinner',
      start: new Date(2015, 3, 12, 20, 0, 0, 0),
      end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
      id: 11,
      title: 'Birthday Party',
      start: new Date(2015, 3, 13, 7, 0, 0),
      end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
      id: 12,
      title: 'Late Night Event',
      start: new Date(2015, 3, 17, 19, 30, 0),
      end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
      id: 12.5,
      title: 'Late Same Night Event',
      start: new Date(2015, 3, 17, 19, 30, 0),
      end: new Date(2015, 3, 17, 23, 30, 0),
    },
    {
      id: 13,
      title: 'Multi-day Event',
      start: new Date(2015, 3, 20, 19, 30, 0),
      end: new Date(2015, 3, 22, 2, 0, 0),
    },
    {
      id: 14,
      title: 'Today',
      start: new Date(new Date().setHours(new Date().getHours() - 3)),
      end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
  ];*/

const events=[
  {
    id: 10,
    start: new Date(2018, 9, 3, 13, 0, 0),
    end: new Date(2018, 9, 3, 13, 0, 0),
    title: 'tutorat'
  }
];

class Selectable extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      selectedDate: "",
      events,
      modal: false
    }

    this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  handleSelect = ({ start, end }) => {
    this.setState({
      selectedDate: moment(start).format("MM/DD/YYYY"),
      modal: true
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onSubmit = (formProps) => {
    const time = document.getElementById('time').value;
    const event = {
      start: new Date(moment(this.state.selectedDate).add(parseInt(time.substring(0, 2)), 'hours').format('YYYY-MM-DD HH:mm')),
      end: new Date(moment(this.state.selectedDate).add(parseInt(time.substring(0, 2))+1, 'hours').format('YYYY-MM-DD HH:mm')),
      title: 'tutorat'
    }
    console.log(event);
    //TODO: salvar e retornar os dados. aqui nao tenho acesso ao state sei la pq
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
          events={this.state.events}
          defaultView={BigCalendar.Views.MONTH}
          defaultDate={new Date()}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
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
      </div>
    )
  }
}

Selectable.propTypes = propTypes


function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form:'signin' })
)(Selectable);

