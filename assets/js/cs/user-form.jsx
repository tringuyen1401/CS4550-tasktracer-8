import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

function UserForm(props) {
  console.log("props@UserForm", props);

  function update(ev) {
    let tgt = $(ev.target);

    let data = {};
    data[tgt.attr('name')] = tgt.val();
    let action = {
      type: 'UPDATE_USER_FORM',
      data: data,
    };
    console.log(action);
    props.dispatch(action);
  }

  function submit(ev) {
    api.submit_user(props.user_form);
    console.log(props.user_form);
  }

  function clear(ev) {
    props.dispatch({
      type: 'CLEAR_USER_FORM',
    });
  }

  return <div style={{padding: "4ex"}}>
    <h2>New Task</h2>
    <FormGroup>
      <Label for="name">Username</Label>
      <Input type="textarea" name="name" value={props.user_form.name} onChange={update}/>        
    </FormGroup>
    <FormGroup>
      <Label for="password">Password</Label>
      <Input type="password" name="password" value={props.user_form.password} onChange={update} />
    </FormGroup>
  <Button onClick={submit} color="primary">Create User</Button> &nbsp;
    <Button onClick={clear}>Clear</Button>
  </div>;
}

function state2props(state) {
  console.log("rerender@UserForm", state);
  return {
    user_form: state.user_form,
  };
}

export default connect(state2props)(UserForm);

