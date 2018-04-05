import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function Task(params) {
  let task = params.task;
  return <Card>
    <CardBody>
      <div>
        <p><b>Assigned To </b>{ task.user.name }</p>
        <p><b>Title</b> { task.title }</p>
        <p><b>Description</b> { task.description }</p>
        <p>{ task.is_complete? "Completed" : "Not completed" }</p>
      </div>
    </CardBody>    
    <p><Link to={"/tasks/"+ task.id}>Edit</Link></p>
  </Card>;
}
