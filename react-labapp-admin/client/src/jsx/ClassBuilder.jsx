import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Panel, FormControl, Table, Glyphicon } from 'react-bootstrap';

import UserCard from './UserCard';

class ClassBuilder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      semesters: props.semesters,
      users: [
        { id: 0, email: "spg011@bucknell.edu", name: "Sam Greenberg", prefName: "Sam Greenberg", icon: "https://www.bucknell.edu/images/Depts/Engineering/News/SamGreenBerg_400w.jpg" },
        { id: 1, email: "tjf010@bucknell.edu", name: "Thomas Ficcadenti", prefName: "Tom Ficcadenti", icon: null },
        { id: 2, email: "njb012@bucknell.edu", name: "Nicholas Bilcheck", prefName: "Nick Bilcheck", icon: "https://www.bucknell.edu/images/Depts/GreekLetterOrgs/BilcheckNick18-ChiPhi-400x385.jpg" },
        { id: 3, email: "asd123@bucknell.edu", name: "Alexandra Drake", prefName: "Alexa Drake", icon: null },
        { id: 4, email: "sdf234@bucknell.edu", name: "Sarah Fredrickson", prefName: "Sarah Fredrickson", icon: null },
        { id: 5, email: "dfg345@bucknell.edu", name: "David Gomez", prefName: "Dave Gomez", icon: null },
        { id: 6, email: "fgh456@bucknell.edu", name: "Frank Harrison", prefName: "Frank Harrison", icon: null },
      ],
      professors: [],
      tas: [],
      students: [],
      searchResults: []
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      semesters: nextProps.semesters
    })
  }

  handleSearchChange(event) {
    const searchTerm = event.target.value.toLowerCase();
    console.log(searchTerm);

    let searchResults = this.state.users.filter(user => {
        console.log(user);
        console.log(user.name.toLowerCase().search(searchTerm) !== -1);
        console.log(user.prefName.toLowerCase().search(searchTerm) !== -1);
        console.log(user.email.toLowerCase().search(searchTerm) !== -1);
        return user.name.toLowerCase().search(searchTerm) !== -1 || 
            user.prefName.toLowerCase().search(searchTerm) !== -1 || 
            user.email.toLowerCase().search(searchTerm) !== -1;
    });

    this.setState({
        searchResults
    });
  }

  render() {
    return (
      <div className="ClassBuilder">
        <Panel>
          <Panel.Heading className="center" componentClass="h3">
            Class Builder
          </Panel.Heading>
          <Panel.Body>
          <Table bordered>
                <thead>
                    <tr>
                        <th>Professors</th>
                        <th>Teachers Assistants</th>
                        <th>Students</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <th colspan={3}>
                            <FormControl
                                type="text"
                                value={this.state.value}
                                placeholder="Enter Name or Username"
                                onChange={this.handleSearchChange}
                                />
                        </th>
                    </tr>
                    <tr>
                        <td colspan={3}>
                            <div className='custom-flex'>
                                { this.state.searchResults.map((user, index) => {
                                    if (index < 15) {
                                        return <UserCard user={user} key={user.id} />
                                    }
                                }) }
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </Table>
          </Panel.Body>
        </Panel>
      </div>
    );
  }

}

const mapStateToProps = state => {
  // console.log(state.semesters);
  const assignments = { ...state.assignments, list: state.assignments.list.map(assignment => { return { ...assignment, problems: [] } }) };
  state.assignments.list.forEach((assignment, index) => {
    assignment.problems.forEach(prob_id => {
      assignments.list[index].problems.push(state.problems.list.find(prob => prob._id === prob_id));
    });
  });
  const semesters = { ...state.semesters, list: state.semesters.list.map(semester => { return { ...semester, assignments: [] } }) };
  state.semesters.list.forEach((semester, index) => {
    if (typeof semester.startDate === 'string') {
      semesters.list[index].startDate = new Date(Date.parse(semester.startDate));
    }
    semester.assignments.forEach(ass_id => {
      semesters.list[index].assignments.push(assignments.list.find(ass => ass._id === ass_id));
    });
  });
  return {
    semesters: semesters
  }
}

export default ClassBuilder = connect(mapStateToProps, null)(ClassBuilder);
