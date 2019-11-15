import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Redirect } from 'react-router';

import { list_sheets, approve_sheet } from '../ajax';

import { Button } from 'react-bootstrap';

import store from '../store';

let SheetsList = connect(({sheets}) => ({sheets}))(({sheets}) => {
	let session = store.getState().session;

	if (session == null) {
		return <Redirect to={'/'} />;
	}


  if (sheets.size === 0) {
    list_sheets();
  }


  let items = _.map([...sheets], ([_, sheet]) => {
    return <SheetItem 
    	key={sheet.id} 
    	sheet={sheet} 
    	worker={!session.is_manager}
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
	let btn = (props.worker || sheet.approve) ? (<div/>) : (
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
			    <Link to={path} >Show</Link>
		    </span>
		  </td>
		  <td>
		  	{btn}
		  </td>
		</tr>
	);
}

export default SheetsList;