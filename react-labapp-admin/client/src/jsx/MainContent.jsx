import React, { Component } from 'react';
import { connect } from 'react-redux'

import Homework from './Homework';
import ClassCalendar from './ClassCalendar';
import ClassBuilder from './ClassBuilder';

import { Route, Switch, withRouter } from 'react-router-dom';

import { DispatchFetchSemesters } from '../redux/semestersActions';
import { DispatchFetchAssignments } from '../redux/assignmentsActions';
import { DispatchFetchProblems } from '../redux/problemsActions';

class MainContent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      semesters: props.semesters || [],
    }
  }

  componentWillMount() {
    this.props.loadStore();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      semesters: nextProps.semesters
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={match => <div>Home</div>}/>
        <Route path='/homeworks/:semester?/:assignment?/:problem?' component={
            match => (
              <Homework match={match} />
            )
          }/>
        <Route path='/calendar' component={
          match => (
              <ClassCalendar match={match} />
            )
          }/>
        <Route path='/classes' component={
          match => ( <ClassBuilder match={match} /> )
          }/>
      </Switch>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    loadStore: () => {
      DispatchFetchSemesters(dispatch);
      DispatchFetchAssignments(dispatch);
      DispatchFetchProblems(dispatch);
    }
  }
}

export default MainContent = withRouter(connect(null, mapDispatchToProps)(MainContent));
