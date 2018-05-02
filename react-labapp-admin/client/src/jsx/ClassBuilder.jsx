import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Panel, FormControl, Table, Glyphicon, Button, Row, Col } from 'react-bootstrap';
import Reorder from 'react-reorder';
import { Image } from 'react-bootstrap';

// import UserCard from './UserCard';
import ModalForm from './ModalForm';

const INIT_USERS = [
  { id: 0, email: "spg011@bucknell.edu", name: "Sam Greenberg", prefName: "Sam Greenberg" },
  { id: 1, email: "tjf010@bucknell.edu", name: "Thomas Ficcadenti", prefName: "Tom Ficcadenti" },
  { id: 2, email: "njb012@bucknell.edu", name: "Nicholas Bilcheck", prefName: "Nick Bilcheck" },
  { id: 3, email: "acu002@bucknell.edu", name: "Augustine Ubah", prefName: "Augustine Ubah" },
  { id: 4, email: "ags017@bucknell.edu", name: "Amanda Stefura", prefName: "Amanda Stefura" },
  { id: 5, email: "nwc005@bucknell.edu", name: "Nathand Carter", prefName: "Nayte Carter" },
  { id: 6, email: "gu001@bucknell.edu", name: "Grevelin Ulerio", prefName: "Grev Ulerio" },
];

class ClassBuilder extends Component {

  constructor(props) {
    super(props);

    this.state = {
      semesters: props.semesters,
      users: INIT_USERS,
      user: null,
      nextUserId: 7,
      professors: [0],
      tas: [],
      students: [],
      searchTerm: "",
      showModals: {
        prof: false,
        ta: false,
        student: false,
        user: false
      }
    };

    this.searchResults = [];

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.onReorder = this.onReorder.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      semesters: nextProps.semesters
    })
  }

  handleSearchChange(event) {
    const searchTerm = event.target.value.toLowerCase();

    this.setState({
        searchTerm
    });
  }

  getUser(email) {
    let result = null;
    this.state.users.forEach((user) => {
      if (user.email === email) {
        result = user;
      }
    });
    return result;
  }

  isProfessor(id, state=null) {
    if (state)
      return state.professors.indexOf(id) !== -1;
    return this.state.professors.indexOf(id) !== -1;
  }

  isTA(id, state=null) {
    if (state)
      return state.tas.indexOf(id) !== -1;
    return this.state.tas.indexOf(id) !== -1;
  }

  isStudent(id, state=null) {
    if (state)
      return state.students.indexOf(id) !== -1;
    return this.state.students.indexOf(id) !== -1;
  }

  addProfessor(state, email) {
    let user = this.getUser(email);
    if (user) {
      if (!this.isProfessor(user.id, state=state) && !this.isTA(user.id, state=state) && !this.isStudent(user.id, state=state)) {
        state.professors.push(user.id);
      } 
    } else {
      state.professors.push(this.state.nextUserId);
      state.users.push({
        id: this.state.nextUserId, 
        email, 
        name: "IDK", 
        prefName: "IDK" 
      });
      state.users.sort((user1, user2) => { return user1.prefName > user2.prefName });
      state.nextUserId++;
    }
  }

  addTA(state, email) {
    let user = this.getUser(email);
    if (user) {
      if (!this.isProfessor(user.id, state=state) && !this.isTA(user.id, state=state) && !this.isStudent(user.id, state=state)) {
        state.tas.push(user.id);
      } 
    } else {
      state.tas.push(this.state.nextUserId);
      state.users.push({
        id: this.state.nextUserId, 
        email, 
        name: "IDK", 
        prefName: "IDK" 
      });
      state.users.sort((user1, user2) => { return user1.prefName > user2.prefName });
      state.nextUserId++;
    }
  }

  addStudent(state, email) {
    let user = this.getUser(email);
    if (user) {
      if (!this.isProfessor(user.id, state=state) && !this.isTA(user.id, state=state) && !this.isStudent(user.id, state=state)) {
        state.students.push(user.id);
      } 
    } else {
      state.students.push(this.state.nextUserId);
      state.users.push({
        id: this.state.nextUserId, 
        email, 
        name: "IDK", 
        prefName: "IDK" 
      });
      state.users.sort((user1, user2) => { return user1.prefName > user2.prefName });
      state.nextUserId++;
    }
  }

  getModals() {
    return (
      <div>
        { this.getAddProfessorModal() }
        { this.getAddTAModal() }
        { this.getAddStudentModal() }
        { this.getEditUserModal() }
      </div>
    )
  }

  getAddProfessorModal() {
    if (this.state.showModals.prof) {
      return (
        <ModalForm 
          title="Add Professor"
          show={ this.state.showModals.prof }
          handleHide={() => {this.setState({showModals: 
            { ...this.state.showModals, prof: false }
          })}}
          handleSubmit={ (outputs) => { 
            let results = outputs.users.split(' ');
            let state = this.state;
            results.forEach((email) => {
              this.addProfessor(state, email);
            });
            state.showModals.prof = false;
            this.setState(state);
            } }
          inputs={ { users: {
            id: "users",
            label: "New Professor Emails",
            type: "textarea",
            value: "",
            help: `Please provide the emails of the professors you wish to add.`
          }} }
          />
      );
    }
  }

  getAddTAModal() {
    if (this.state.showModals.ta) {
      return (
        <ModalForm 
          title="Add Teachers Assistant"
          show={ this.state.showModals.ta }
          handleHide={() => {this.setState({showModals: 
            { ...this.state.showModals, ta: false }
          })}}
          handleSubmit={ (outputs) => { 
            let results = outputs.users.split(' ');
            let state = this.state;
            results.forEach((email) => {
              this.addTA(state, email);
            });
            state.showModals.ta = false;
            this.setState(state);
            } }
          inputs={ { users: {
            id: "users",
            label: "New Teachers Assistant Emails",
            type: "textarea",
            value: "",
            help: `Please provide the emails of the TAs you wish to add.`
          }} }
          />
      );
    }
  }

  getAddStudentModal() {
    if (this.state.showModals.student) {
      return (
        <ModalForm 
          title="Add Students"
          show={ this.state.showModals.student }
          handleHide={() => {this.setState({showModals: 
            { ...this.state.showModals, student: false }
          })}}
          handleSubmit={ (outputs) => { 
            let results = outputs.users.split(' ');
            let state = this.state;
            results.forEach((email) => {
              this.addStudent(state, email);
            });
            state.showModals.prof = false;
            this.setState(state);
            } }
          inputs={ { users: {
            id: "users",
            label: "New Student Emails",
            type: "textarea",
            value: "",
            help: `Please provide the emails of the students you wish to add.`
          }} }
          />
      ); 
    }
  }

  getEditUserModal() {
    let self = this;
    if (self.state.user) {
      return (
        <ModalForm 
          title="Edit User"
          show={ self.state.showModals.user }
          handleHide={() => {self.setState({showModals: 
            { ...self.state.showModals, user: false }
          })}}
          handleSubmit={ outputs => { 
            let users = self.state.users.filter(user => { return user.id !== self.state.user.id });
            users.push({
              id: self.state.user.id,
              email: outputs.email,
              name: outputs.name,
              prefName: outputs.prefName
            });
            users.sort((user1, user2) => { return user1.prefName > user2.prefName });
            self.setState({
              users: users,
              showModals: { ...self.state.showModals, user: false }
            });
          } }
          inputs={ { 
            name: {
              id: "name",
              label: "Name",
              value: self.state.user.name,
              help: `Please provide the name of this user.`
            },
            prefName: {
              id: "prefName",
              label: "Preferred Name",
              value: self.state.user.prefName,
              help: `Please provide the preferred name of this user.`
            },
            email: {
              id: "email",
              label: "Email",
              value: self.state.user.email,
              help: `Please provide the email of this user.`
            }
          } }
          />
      );
    }
  }

  onReorder(event, previousIndex, nextIndex, fromId, toId) {
    let newState = {};
    if (fromId !== toId) {
      if (fromId !== 'users') {
        newState[fromId] = this.state[fromId].filter(user => user !== Number(event.target.id));
      }
      if (toId !== 'users') {
        newState[toId] = this.state[toId];
        newState[toId].push(Number(event.target.id));
      }
      this.setState(newState);
    }
  }

  getCard(user) {
    return (
      <div className="UserCard noselect" key={user.id} id={user.id}
        onDoubleClick={ () => { 
          this.setState({
            showModals: { ...this.state.showModals, user: true },
            user: user
          }) } }>
        { this.getImage(user) }
        <b>{user.prefName}</b><br/>
        {user.email}
      </div>
    )
  }

  getImage(user) {
    return (
      <Image circle id={user.id}
        src={ `https://myapi.bucknell.edu/framework/media/person/${user.email.replace('@bucknell.edu', '')}?access_token=70c746e5-0a28-4c56-a4b7-84ade9d05940&width=128&height=128` } 
        alt={ user.prefName }
        />
    )
  }

  renderProfessors() {
    return (
      <Reorder
        reorderId='professors'
        reorderGroup="class-group"
        className="custom-flex"
        component="div"
        holdTime={250}
        touchHoldTime={250}
        mouseHoldTime={150}
        autoScroll={true}
        onReorder={this.onReorder}
        placeholder={<div className="TempUserCard" />}>
        { 
          this.state.users
          .filter(user => this.state.professors.indexOf(user.id) !== -1)
          .map(user => this.getCard(user))
        }
      </Reorder>
    )
  }

  renderTAs() {
    return (
      <Reorder
        reorderId='tas'
        reorderGroup="class-group"
        className="custom-flex"
        component="div"
        holdTime={250}
        touchHoldTime={250}
        mouseHoldTime={150}
        autoScroll={true}
        onReorder={this.onReorder}
        placeholder={<div className="TempUserCard" />}>
        {
          this.state.users
          .filter(user => this.state.tas.indexOf(user.id) !== -1)
          .map(user => this.getCard(user))
        }
      </Reorder>
    )
  }

  renderStudents() {
    return (
      <Reorder
        reorderId='students'
        reorderGroup="class-group"
        className="custom-flex"
        component="div"
        holdTime={250}
        touchHoldTime={250}
        mouseHoldTime={150}
        autoScroll={true}
        onReorder={this.onReorder}
        placeholder={<div className="TempUserCard" />}>
        {
          this.state.users
          .filter(user => this.state.students.indexOf(user.id) !== -1)
          .map(user => this.getCard(user))
        }
      </Reorder>
    )
  }

  renderUsers() {
    this.searchResults = this.state.users.filter(user => {
      return user.name.toLowerCase().search(this.state.searchTerm) !== -1 || 
        user.prefName.toLowerCase().search(this.state.searchTerm) !== -1 || 
        user.email.toLowerCase().search(this.state.searchTerm) !== -1;
    });

    return (
      <Reorder
        reorderId='users'
        reorderGroup="class-group"
        className="custom-flex"
        component="div"
        holdTime={250}
        touchHoldTime={250}
        mouseHoldTime={150}
        autoScroll={true}
        onReorder={this.onReorder}
        placeholder={<div className="TempUserCard" />}>
        {
          this.searchResults
          .filter((user, index) => {
            return (this.state.professors.indexOf(user.id) === -1 && 
              this.state.tas.indexOf(user.id) === -1 &&
              this.state.students.indexOf(user.id) === -1);
          })
          .map(user => this.getCard(user))
        }
      </Reorder>
    )
  }

  render() {

    return (
      <div className="ClassBuilder">
        <Panel>
          <Panel.Heading className="center" componentClass="h3">
            Class Builder
          </Panel.Heading>
          <Panel.Body>
            <Table bordered condensed>
              <thead>
                  <tr>
                    <th>
                      <Row>
                        <Col sm={2}></Col>
                        <Col sm={8} style={{ textAlign: "center" }}>
                          Professors
                        </Col>
                        <Col sm={2} style={{ textAlign: "right" }}>
                          <Button onClick={ () => { this.setState({showModals: { ...this.state.showModals, prof: true }}) } }>
                            <Glyphicon glyph="plus" />
                          </Button>
                        </Col>
                      </Row>
                    </th>
                    <th>
                      <Row>
                        <Col sm={2}></Col>
                        <Col sm={8} style={{ textAlign: "center" }}>
                          Teachers Assistants
                        </Col>
                        <Col sm={2} style={{ textAlign: "right" }}>
                          <Button onClick={ () => { this.setState({showModals: { ...this.state.showModals, ta: true }}) } }>
                            <Glyphicon glyph="plus" />
                          </Button>
                        </Col>
                      </Row>
                    </th>
                    <th>
                      <Row>
                        <Col sm={2}></Col>
                        <Col sm={8} style={{ textAlign: "center" }}>
                          Students
                        </Col>
                        <Col sm={2} style={{ textAlign: "right" }}>
                          <Button onClick={ () => { this.setState({showModals: { ...this.state.showModals, student: true }}) } }>
                            <Glyphicon glyph="plus" />
                          </Button>
                        </Col>
                      </Row>
                    </th>
                  </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    { this.renderProfessors() }
                  </td>
                  <td>
                    { this.renderTAs() }
                  </td>
                  <td>
                    { this.renderStudents() }
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={3}>
                    <FormControl
                      type="text"
                      value={this.state.value}
                      placeholder="Enter Name or Username"
                      onChange={this.handleSearchChange}
                      />
                  </th>
                </tr>
                <tr>
                  <td colSpan={3}>
                    { this.renderUsers() }
                  </td>
                </tr>
              </tfoot>
            </Table>
          </Panel.Body>
        </Panel>
        { this.getModals() }
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
