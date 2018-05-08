import React, { Component } from 'react';
import {Card, CardText, CardBody, CardHeader, CardFooter, CardTitle, CardSubtitle, Button, Badge} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProblemCard.css';

export class ProblemCard extends Component {
  constructor(props) {
    super();
  }
  render() {
    var badge = <p></p>;
    if (this.props.complete === true) {
      badge = <Badge color="primary">Complete!</Badge>
    }
    return (
      <div className="App">
        <Card className="card text-left border-primary">
          <CardHeader tag="h3"><b>Homework {this.props.homework}</b> -- Problem {this.props.problem} {badge}</CardHeader>
          <CardBody className="text-primary">
            <CardTitle><b>{this.props.title}</b></CardTitle>
            <CardSubtitle>Due: {this.props.dueDate}</CardSubtitle>
            <CardText>{this.props.description}</CardText>
          </CardBody>
          <CardFooter>
            <Button color="info">Submit Here!</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
}
