import React, { Component } from 'react';
import './App.css';
import {ProblemCard} from './components/ProblemCard/ProblemCard.jsx';
import {Feed} from './components/Feed.jsx';
import {Row, Col, Container} from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      problems: [
                    {
                      'homework': 1,
                      'problem': 1,
                      'due': '4/10/2018',
                      'title': 'Hello World',
                      'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed facilisis cursus augue, sit amet consequat ligula accumsan convallis. Quisque vitae bibendum tellus. Nunc ac pharetra ante. Pellentesque finibus, felis tristique pulvinar laoreet, nisi ante viverra ipsum, eu ultrices diam libero a dui. Duis magna dui, fermentum a dignissim sed, convallis vitae justo. Cras lobortis eget diam viverra dapibus. Fusce risus arcu, lobortis non viverra sit amet, hendrerit tempus metus. Praesent efficitur id lectus quis suscipit. Etiam viverra varius mauris vel viverra. In volutpat vel arcu in vestibulum.',
                      'complete': false
                    },
                    {
                      'homework': 1,
                      'problem': 2,
                      'due': '4/6/2018',
                      'title': 'Printing Strings',
                      'description': 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque eleifend turpis nec tortor auctor fringilla. Aliquam tincidunt urna quis interdum fermentum. Pellentesque congue eget eros in efficitur. Nunc eget fermentum nisl. Vestibulum iaculis efficitur gravida. Phasellus vel eros aliquet, hendrerit lacus a, maximus turpis. Sed varius turpis leo, quis mollis nulla suscipit nec. Fusce auctor, orci sed feugiat molestie, leo lacus suscipit augue, nec placerat elit lorem non dui. Nam a sollicitudin orci. Suspendisse sed turpis vitae diam pharetra cursus et non dolor. Vivamus id diam mattis, maximus enim viverra, molestie dolor.',
                      'complete': true,
                    },
                    {
                      'homework': 2,
                      'problem': 1,
                      'due': '4/12/2018',
                      'title': 'Machine Learning',
                      'description': 'Integer ac elementum enim. Curabitur in tortor porttitor leo viverra ultrices vulputate ut ligula. Suspendisse enim ipsum, scelerisque eu malesuada eu, suscipit sit amet orci. Aenean at enim a justo facilisis condimentum. Curabitur commodo nec risus nec faucibus. Vivamus sit amet mollis dolor, quis varius est. Nunc nec blandit purus. Pellentesque efficitur justo sollicitudin vulputate cursus. Nunc porta malesuada orci ut sagittis. Pellentesque sodales urna ac ligula tristique, nec tincidunt quam tincidunt. Phasellus rhoncus lobortis ligula sit amet facilisis. Curabitur neque est, suscipit tincidunt sollicitudin vitae, vestibulum ut turpis. Nunc feugiat, dolor non bibendum tristique, nibh augue porttitor mi, eget elementum augue augue eu nibh.',
                      'complete': false
                    }
                  ]
    }
  }
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="3"></Col>
            <Col xs="6">
              <Feed problems={this.state.problems} />
            </Col>
            <Col xs="3"></Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
