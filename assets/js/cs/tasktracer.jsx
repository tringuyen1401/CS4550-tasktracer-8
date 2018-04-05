import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Nav from './nav';
import Users from './users';
import Report from './report';
import TaskForm from './task-form';
import UserForm from './user-form';
import EditForm from './edit-form';

export default function tasktracer_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Tasktracer state={store.getState()} />
    </Provider>,
    document.getElementById('root'),
  );
}

let Tasktracer = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Route path="/" exact={true} render={() =>
          <div>
            <TaskForm />
            <Report tasks={props.tasks} />
          </div>
        } />
        <Route path="/users" exact={true} render={() =>
          <Users users={props.users} />
        } />
        <Route path="/users/:user_id" render={({match}) =>
          <Report tasks={_.filter(props.tasks, (pp) =>
            match.params.user_id == pp.user.id )
          } />
        } />
        <Route path="/tasks/:task_id" exact={true} render={({match}) =>{
          let f_tasks = _.filter(props.tasks, (pp) =>
            match.params.task_id == pp.id )
          return (
          <div>
            <EditForm f_tasks={f_tasks}/>
            <Report tasks={f_tasks.length > 1 ? [f_tasks[0]] : f_tasks} />
          </div>
         );} 
        } />
        <Route path="/register" exact={true} render={() =>
          <div>
            <UserForm />
          </div>
        } />
      </div>
    </Router>
  );
});

