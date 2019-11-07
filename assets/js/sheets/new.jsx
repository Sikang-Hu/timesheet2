import React from 'react';
import ReactDOM from 'react-dom';

import { Form, Button } from 'react-bootstrap';

export default function SheetsNew(props) {
  return (
    <div>
      <h1>New Timesheet</h1>
      <Form.Group controlId="desc">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows="3" />
      </Form.Group>
      <Form.Group controlId="submit">
        <Button variant="primary">Upload Photo</Button>
      </Form.Group>
    </div>
  );
}