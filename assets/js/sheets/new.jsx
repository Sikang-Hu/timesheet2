import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert, Col, Row} from 'react-bootstrap';
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
    let date  = input.value;
    this.changed({date: date});
  }

  new_task() {
    return {
      job_code: "", 
      spend_hours: 0,
      note: ""
    }
  }


  add_task() {
    let tasks = this.props.tasks;
    if (tasks.length < 8) {
      tasks = tasks.concat([this.new_task()])
    }
    this.changed({tasks: tasks});
  }

  delete_task(index) {
    let tasks = this.props.tasks.concat([]);
    if (tasks.length > 0) {
      tasks.splice(index, 1);
    }
    this.changed({tasks: tasks});
  }

  jobcode_changed(index, ev) {
    let job_code = ev.target.value;
    let tasks = this.props.tasks.concat([]);
    if (tasks.length > 0) {
      tasks[index] = Object.assign({}, tasks[index], {job_code: job_code});
    }
    this.changed({tasks: tasks});
  }

  hour_changed(index, ev) {
    let spend_hours = ev.target.value;
    let tasks = this.props.tasks.concat([]);
    if (tasks.length > 0) {
      tasks[index] = Object.assign({}, tasks[index], {spend_hours: spend_hours});
    }
    this.changed({tasks: tasks});
  }

  note_changed(index, ev) {
    let note = ev.target.value;
    let tasks = this.props.tasks.concat([]);
    if (tasks.length > 0) {
      tasks[index] = Object.assign({}, tasks[index], {note: note});
    }
    this.changed({tasks: tasks});
  }

  render() {
    let {date, tasks, errors, dispatch} = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{ errors }</Alert>;
    }

    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    let task_forms = [];
    for (let i = 0; i < tasks.length; i++) {
      task_forms.push(<TaskForm 
        key={"task_form " + i}
        task={task}
        onClick={() => this.delete_task(i)}
        onChangeJob={(ev) => this.jobcode_changed(i, ev)}
        onChangeHour={(ev) => this.hour_changed(i, ev)}
        onChangeNote={(ev) => this.note_changed(i, ev)}
        />);
    }

    return (
      <div>
        <h1>New Sheet</h1>
        { error_msg }
        <Row>
          <Col>
            <form>
              Choose A Date:
              <input type="date" name="date" onChange={(ev) => this.date_changed(ev)}/>
            </form>
          </Col>
          <Col >
            <Button variant="primary"
                    onClick={() => this.add_task()}>
              Add A Task</Button>
          </Col>
        </Row>
        <Row>
         {task_forms}
        </Row>
        <Row>
          <Form.Group controlId="submit">
            <Button variant="primary"
                    onClick={() => submit_new_sheet(this)}>
              Submit New Sheet</Button>
          </Form.Group>
        </Row>
      </div>
    );
  }
}

function TaskForm(probs) {
  return (
    <Form.Row>
      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Job Code</Form.Label>
        <Form.Control as="select" onChange={props.onChangeJob}>
          <option>Choose...</option>
          <option>...dsfs</option>
        </Form.Control>
      </Form.Group>
      <Form.Group as={Col} controlId="formGridCity" onChange={props.onChangeHour}>
        <Form.Label>Hours</Form.Label>
        <Form.Control />
      </Form.Group>
      <Form.Group as={Col} controlId="formGridZip" onChange={props.onChangeNote}>
        <Form.Label>Note</Form.Label>
        <Form.Control />
      </Form.Group>
      <Form.Group as={Col} controlId="formGridZip">
        <Button variant="primary"
                      onClick={props.onClick}>
                Delete</Button>
      </Form.Group>
    </Form.Row>
    );
}

export default connect(state2props)(SheetsNew);