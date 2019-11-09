import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze-strict';




function login(st0 = {email: "", password: "", errors: null}, action) {
  switch(action.type) {
    case 'CHANGE_LOGIN':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function new_sheet(st0 = {date: null, tasks: [], errors: null, jobs: []}, action) {
  switch (action.type) {
    case 'CHANGE_NEW_SHEET':
      return Object.assign({}, st0, action.data);
    default:
      return st0;
  }
}

function forms(st0, action) {
  let reducer = combineReducers({
    login,
    new_sheet
  });
  return reducer(st0, action);
}


let session0 = localStorage.getItem('session');
if (session0) {
  session0 = JSON.parse(session0);
}
function session(st0 = session0, action) {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;
    case 'LOG_OUT':
      return null;
    default:
      return st0;
  }
}

// function users(st0 = new Map(), action) {
//   return st0;
// }

function sheets(st0 = new Map(), action) {
  switch (action.type) {
    case 'ADD_SHEETS':
      let st1 = new Map(st0);
      for (let sheet of action.data) {
        st1.set(sheet.id, sheet);
      }
      console.log(st1);
      return st1;
    default:
      return st0;
  }
}


function root_reducer(st0, action) {
  console.log("root reducer", st0, action);
  let reducer = combineReducers({
  	forms,
    sheets,
    session,
  });
  return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;