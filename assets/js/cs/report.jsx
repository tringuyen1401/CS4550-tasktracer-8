import React from 'react';
import Task from './task';

export default function Report(params) {
  let tasks = _.map(params.tasks, (pp, ii) => <Task key={ii} task={pp} />);
  return <div>
    { tasks }
  </div>;
}

