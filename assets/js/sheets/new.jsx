import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_new_photo } from '../ajax';

function state2props(state) {
  return state.forms.new_sheet;
}

class SheetsNew extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      redirect: null,
    }
  }

  redirect(path) {
    this.setState({redirect: path});
  }

  changed(data) {
    this.props.dispatch({
      type: 'CHANGE_NEW_SHEET',
      data: data,
    });
  }

  date_changed(ev) {
    let input = ev.target;
    console.log(input);
    let date  = null;
    this.changed({date: date});
  }

  add_task() {

  }

  jobcode_changed(index, ev) {

  }

  hour_changed(index, ev) {

  }

  note_changed(index, ev) {

  }

  render() {
    let {file, desc, errors, dispatch} = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div>
        <h1>New Sheet</h1>
        { error_msg }
        <form>
          Choose A Date:
          <input type="date" name="date" onChange{(ev) => this.date_changed(ev)}/>
        </form>
        
        <Form.Group controlId="submit">
          <Button variant="primary"
                  onClick={() => submit_new_sheet(this)}>
            Submit New Sheet</Button>
        </Form.Group>
      </div>
    );
  }
}

export default connect(state2props)(SheetsNew);