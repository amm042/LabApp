import React, { Component } from 'react';
import {ProblemCard} from './ProblemCard/ProblemCard.jsx';

export class Feed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let feed;
    //console.log(this.props.messages instanceof Array);
    if (this.props.problems){
      feed = this.props.problems.map((problemObj, index) => {
        return (
          <ProblemCard homework={problemObj['homework']}
                       problem={problemObj['problem']}
                       title={problemObj['title']}
                       dueDate={problemObj['due']}
                       description={problemObj['description']}
                       complete = {problemObj['complete']}/>
        );
      });
    }

    return (
      <div> {/* container for component */}
        {feed}
      </div>
    );
  }
}
