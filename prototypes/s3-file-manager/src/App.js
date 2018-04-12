import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import FileList from './FileList.jsx'

import { Container, Row, Col } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col>
            <FileList host="http://127.0.0.1:9000" bucket="labapp-uploads"/>
          </Col>
        </Row>
        <Row>
        <Col>File Upload goes here</Col>
        </Row>
      </Container>
    );
  }
}

export default App;
