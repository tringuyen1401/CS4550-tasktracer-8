import React from 'react';
import { connect } from 'react-redux';
import { Button, FormGroup, Label, Input } from 'reactstrap';
import api from '../api';

class EditForm extends React.Component {

  componentDidMount() {
    let data = this.props.f_tasks[0];
    let action = {
      data: data,
      type: 'UPDATE_TASK_FORM'
    };
    console.log(action);
    this.props.dispatch(action);
  }

  update(ev) {
    let tgt = $(ev.target);
    console.log(tgt.val());

    let data = {};
    if (tgt.attr('name') === "is_complete") {
      data["is_complete"] = tgt.val() ? true : false;
    } else {
      data[tgt.attr('name')] = tgt.val();
    }
    let action = {
      type: 'UPDATE_TASK_FORM',
      data: data,
    };
    console.log(action);
    this.props.dispatch(action);
  }

  submit(ev) {
    
    api.edit_task(this.props.task_form, this.props.task_form.id, this.props.task_form.user_id || this.props.task_form.user.id);
    console.log(this.props.task_form);
  }

  clear(ev) {
    this.props.dispatch({
      type: 'CLEAR_TASK_FORM',
    });
  }

  render() {
  let users = _.map(this.props.users, (uu) => <option key={uu.id} value={uu.id}>{uu.name}</option>);
  let task = this.props.f_tasks[0] || this.props.task_form;
  let user_id = this.props.task_form.user_id || this.props.task_form.user.id;
  let title = this.props.task_form.title;
  let description = this.props.task_form.description;
  return <div style={{padding: "4ex"}}>
    <h2>New Task</h2>
    <FormGroup>
      <Label for="user_id">Assignee</Label>
      <Input type="select" name="user_id" value={user_id} onChange={this.update.bind(this)}>
        { users }
      </Input>
    </FormGroup>
    <FormGroup>
      <Label for="title">Title</Label>
      <Input type="textarea" name="title" value={title} onChange={this.update.bind(this)} />
    </FormGroup>
    <FormGroup>
      <Label for="description">Description</Label>
      <Input type="textarea" name="description" value={description} onChange={this.update.bind(this)} />
    </FormGroup>
    <FormGroup>
      <Input type="checkbox" name="is_complete" value={this.props.task_form.is_complete || task.is_complete} onChange={this.update.bind(this)} />      
      <Label for="is_complete">Is complete</Label>
    </FormGroup>
    <FormGroup>
      <Label for="assigned_at">Assigned At</Label>
      <Input type="datetime-local" name="assigned_at" value={this.props.task_form.assigned_at} onChange={this.update.bind(this)} />
    </FormGroup>
   
  <Button onClick={this.submit.bind(this)} color="primary">Edit</Button> &nbsp;
    <Button onClick={this.clear.bind(this)}>Clear</Button>
  </div>;
}
}

export default connect(
  ({ task_form, users}) => ({
    users: users,
    task_form: task_form,
  }))(EditForm);

