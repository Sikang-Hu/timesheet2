import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';

import { list_sheets, approve_sheet } from '../ajax';

import { Button } from 'react-bootstrap';

import store from '../store';

let SheetsList = connect(({sheets}) => ({sheets}))(({sheets}) => {
  if (sheets.size == 0) {
    list_sheets();
  }

  let session = store.getState().session;

  let is_worker = session == null ? null : session.is_worker;

  let items = _.map([...sheets], ([_, sheet]) => {
    return <SheetItem 
    	key={sheet.id} 
    	sheet={sheet} 
    	worker={is_worker}
    	onClick={approve_sheet}
    	/>;
  });

  return (
    <table className="table table-striped">
	  <thead>
	    <tr>
	      <th>Date</th>
	      <th>Approved</th>
	      <th>Worker</th>

	      <th></th>
	    </tr>
	  </thead>
	  <tbody>
	  	{items}
	  </tbody>
	</table>

  );
});

function SheetItem(props) {
	let sheet = props.sheet;
	let path = "/sheets/" + sheet.id;
	let btn = (props.worker || sheet.approve) ? (<div></div>) : (
		<Button variant="primary" onClick={() => props.onClick(sheet.id)}>
            Approve
          </Button>
		);
	return (  
		<tr>
		  <td>{sheet.date}</td>
		  <td>{sheet.approve ? "True" : "False"}</td>
		  <td>{sheet.worker.name}</td>

		  <td>
		    <span>
			    <Link to={path} activeClassName="active">Show</Link>
		    </span>
		  </td>
		  <td>
		  	{btn}
		  </td>
		</tr>
	);
}

export default SheetsList;