import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

import './css/App.css';
import './css/Theme.css';

import Section from './Section';

class Page extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sections: [{
        header: null,
        body: null,
        editting: true
      }]
    };

    this.addSection = this.addSection.bind(this);
  }

  addSection() {
    const sections = this.state.sections;
    sections.push({
      header: null,
      body: null,
      editting: true
    });
    this.setState({sections});
  }

  updateHeader(index, header) {
    const sections = this.state.sections;
    sections[index] = {
      ...this.state.sections[index],
      header,
      editting: true
    };
    this.setState({sections});
  }

  updateBody(index, body) {
    const sections = this.state.sections;
    if (this.state.sections[index].editting) {
      sections[index] = {
        ...this.state.sections[index],
        body,
        editting: true
      };
      this.setState({sections});
    }
  }

  toggleEditting(index) {
    const sections = this.state.sections;
    sections[index] = {
      ...this.state.sections[index],
      editting: !this.state.sections[index].editting
    };
    this.setState({sections});
  }

  render() {
    return (
      <div className="App">
        <div>
          {this.state.sections.map((section, index) => {
            return <Section
              key={index}
              header={section.header}
              body={section.body}
              editting={section.editting}
              updateHeader={input => this.updateHeader(index, input.target.value)}
              updateBody={input => this.updateBody(index, input)}
              toggleEditting={() => this.toggleEditting(index)}
              />
          })}
          <button className="round-button" onClick={this.addSection}>&#x2b;</button>
        </div>
      </div>
    );
  }
}

export default Page;
