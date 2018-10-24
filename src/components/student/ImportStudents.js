import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import readXlsxFile from 'read-excel-file';

import './ProgramStyle.css';

class ImportStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
          file: ''
        }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const file = this.state.file;
      const data = {
        file
      }

      this.props.importUser(data, () => {
        this.props.history.push('/');
      })
    }

    handleChange = (e) => {
      const input = document.getElementById('input');

      readXlsxFile(input.files[0]).then((rows) => {
        this.setState({
           file: rows
        })
      })
    }

    render() {
        return (
          <div className="container">
            <form onSubmit={this.handleSubmit}>
                 <h3>Importer étudiants</h3>
                 <div className="form-group">
                    <label>File:</label>
                    <input type="file" id="input" onChange={this.handleChange} />
                 </div>
                 <button className="btn btn-primary">Importer</button>
            </form>
          </div>
        );
    }
}

function mapStateToProps(state) {
  return { program: state.program.data };
}

export default compose(
    connect(mapStateToProps, actions),
    requireAuth
)(ImportStudents);
