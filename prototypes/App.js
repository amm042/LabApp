import React, { Component } from 'react';
import './App.css';
import {Card, CardText, CardBody, CardHeader, CardTitle, CardSubtitle} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Card className="text-left">
          <CardHeader tag="h3">Homework 1 Problem 1</CardHeader>
          <CardBody>
            <CardTitle>Hello World!</CardTitle>
            <CardSubtitle>The timeless classic</CardSubtitle>
            <CardText>Get your first program up and running!</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default App;
