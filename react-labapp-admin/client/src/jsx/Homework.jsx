import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
  Breadcrumb, Panel, ListGroupItem, ButtonGroup, Button,
  Row, Col, Glyphicon, Popover, OverlayTrigger
} from 'react-bootstrap';
import ModalForm from './ModalForm';
import DualEditor from './DualEditor';
import _ from 'lodash';
import Reorder, {
  reorder
} from 'react-reorder';

import { DispatchAddCourse, DispatchEditCourse, DispatchDeleteCourse } from '../redux/coursesActions';
import { DispatchAddSemester, DispatchEditSemester, DispatchDeleteSemester } from '../redux/semestersActions';
import { DispatchAddAssignment, DispatchEditAssignment, DispatchDeleteAssignment } from '../redux/assignmentsActions';
import { DispatchAddProblem, DispatchEditProblem, DispatchDeleteProblem } from '../redux/problemsActions';

const popoverHoverFocus = (header, body) => {
  return (
    <Popover id="popover-trigger-hover-focus" title={header}>
      {body}
    </Popover>
  );
};

class Homework extends Component {

  constructor(props) {
    super(props);

    this.state = {
      path: ["Courses"],
      courses: props.courses || [],
      selection: null,
      editting: false,
      dragged: false,
      showAddModal: false,
      showCopyModal: false,
      showEditModal: false,
      showRemoveModal: false,
      tempContent: ""
    }

    if (props.match.match.params.course) {
      this.state.path.push(props.match.match.params.course);
      if (props.match.match.params.semester) {
        this.state.path.push(props.match.match.params.semester);
        if (props.match.match.params.assignment) {
          this.state.path.push(props.match.match.params.assignment);
          if (props.match.match.params.problem) {
            this.state.path.push(props.match.match.params.problem);
          }
        }
      }
    }

    this.updateSemesters = props.onUpdate;

    this.openAddModal = this.openAddModal.bind(this);
    this.handleAddSubmit = this.handleAddSubmit.bind(this);

    this.openCopyModal = this.openCopyModal.bind(this);
    this.handleCopySubmit = this.handleCopySubmit.bind(this);

    this.openEditModal = this.openEditModal.bind(this);
    this.handleEditSubmit = this.handleEditSubmit.bind(this);

    this.openRemoveModal = this.openRemoveModal.bind(this);
    this.handleRemoveSubmit = this.handleRemoveSubmit.bind(this);

    this.onReorder = this.onReorder.bind(this);
  }

  /**
   * Gets the path of the page given the currently navigated and selected state
   * @return {{ semester: string, assignment: string, problem: string }}
   */
  getPath() {
    let course, semester, assignment, problem;
    if (this.state.path.length > 1) {
      course = this.state.courses.list.find(course => course.name === this.state.path[1]);
    } else if (this.state.selection && this.state.path.length === 1) {
      course = this.state.courses.list.find(course => course.name === this.state.selection);
    }
    if (course && this.state.path.length > 2) {
      semester = course.semesters.find(semester => semester.name === this.state.path[2]);
    } else if (this.state.selection && this.state.path.length === 2) {
      semester = course.semesters.find(semester => semester.name === this.state.selection);
    }
    if (semester && this.state.path.length > 3) {
      assignment = semester.assignments.find(assignment => assignment.name === this.state.path[3]);
    } else if (this.state.selection && this.state.path.length === 3) {
      assignment = semester.assignments.find(assignment => assignment.name === this.state.selection);
    }
    if (assignment && this.state.path.length > 4) {
      problem = assignment.problems.find(problem => problem.name === this.state.path[4]);
    } else if (this.state.selection && this.state.path.length === 4) {
      problem = assignment.problems.find(problem => problem.name === this.state.selection);
    }
    return { course, semester, assignment, problem };
  }

  goToPath(urlList) {
    let path = "/homeworks";
    urlList.forEach(item => {
      path += '/' + item;
    });
    this.props.match.history.push(path);
    this.setState([ 'Courses', ...urlList ]);
  }

  componentWillReceiveProps(nextProps) {
    const path = ["Courses"];
    if (nextProps.match.match.params.course) {
      path.push(nextProps.match.match.params.course);
      if (nextProps.match.match.params.semester) {
        path.push(nextProps.match.match.params.semester);
        if (nextProps.match.match.params.assignment) {
          path.push(nextProps.match.match.params.assignment);
          if (nextProps.match.match.params.problem) {
            path.push(nextProps.match.match.params.problem);
          }
        }
      }
    }

    this.setState({
      path,
      courses: nextProps.courses
    });
  }

  getEditButton() {
    if (this.state.path.length < 5) {
      return (
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="bottom"
          overlay={popoverHoverFocus(null, this.state.editting ? "Done" : "Edit")}
        >
          {
            (this.state.editting) ?
            <Button 
              onClick={() => {
                this.setState({
                  editting: false,
                  selection: null
                });
              }}>
              <Glyphicon glyph="remove" />
            </Button> :
            <Button onClick={() => this.setState({editting: true})}>
              <Glyphicon glyph="edit" />
            </Button>
          }
        </OverlayTrigger>
      );
    } else {
      return (
        <OverlayTrigger
          trigger={['hover', 'focus']}
          placement="bottom"
          overlay={popoverHoverFocus(null, this.state.editting ? "Done" : "Edit")}
        >
          {
            (this.state.editting) ?
            <Button onClick={() => {
              this.props.editProblem(
                this.getPath().course,
                this.getPath().semester,
                this.getPath().assignment,
                this.getPath().problem,
                { content: this.state.tempContent }
              ).then(() => {
                this.setState({
                  editting: false
                });
              });
            }}>
              <Glyphicon glyph="remove" />
            </Button> :
            <Button onClick={() => this.setState({editting: true})}>
              <Glyphicon glyph="edit" />
            </Button>
          }
        </OverlayTrigger>
      );
    }
  }

  getTitle() {
    switch (this.state.path.length) {
      case (1):
        return "Course"
      case (2):
        return "Semester";
      case (3):
        return "Assignment";
      case (4):
        return "Problem";
      default:
        return "Error";
    }
  }

  getContent() {
    switch (this.state.path.length) {
      case (1): 
        return this.getSelection(
          this.getTitle() + "s",
          this.state.courses.list
        );
      case (2):
        if (this.getPath().course) {
          return this.getSelection(
            this.getTitle() + "s",
            this.getPath().course.semesters
          );
        }
        break;
      case (3):
        if (this.getPath().semester) {
          return this.getSelection(
            this.getTitle() + "s",
            this.getPath().semester.assignments
          );
        }
        break;
      case (4):
        if (this.getPath().assignment) {
          return this.getSelection(
            this.getTitle() + "s",
            this.getPath().assignment.problems
          );
        }
        break;
      case (5):
        if (this.getPath().problem) return this.getPage();
        break;
      default:
        return null;
        break;
    }
  }

  getSelection(name, list) {
    const getDate = (listItem, index) => {
      var options = {
        weekday: "long", year: "numeric", month: "short",
        day: "numeric"
      };

      if (this.state.path.length === 2) {
        const startDate = new Date(listItem.startDate.getTime());
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + listItem.assignments.length * 7);
        return `${startDate.toLocaleString("en-us", { month: "long", year: "numeric" })} - ${endDate.toLocaleString("en-us", { month: "long", year: "numeric" })}`
      } else if (this.state.path.length === 3) {
        const startDate = new Date(this.getPath().semester.startDate);
        startDate.setDate(startDate.getDate() + 7 * index);
        const endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);
        return `${startDate.toLocaleString("en-us", options)} - ${endDate.toLocaleString("en-us", options)}`
      } else if (this.state.path.length === 4) {
        const semester = this.getPath().semester;
        const date = new Date(semester.startDate.getTime());
        date.setDate(date.getDate()
          + 7 * semester.assignments.findIndex(assignment => assignment.name === this.state.path[3])
          + listItem.dayOffset);
        return `${date.toLocaleString("en-us", options)}`
      }
    }

    return (
      <Panel>
        <Panel.Heading className="center" componentClass="h3">
          <Row className="show-grid">
            <Col sm={2}>

            </Col>
            <Col sm={8}>
              {name}
            </Col>
            <Col sm={2} className="right">
              { this.getEditButton() }
            </Col>
          </Row>
        </Panel.Heading>
        <Panel.Body>
          {
            (this.state.editting) ?
            <div>
              <ButtonGroup justified>
                <Button href="#" onClick={this.openAddModal}>Add</Button>
                <Button href="#" onClick={this.openCopyModal} disabled={this.state.selection === null}>Copy</Button>
                <Button href="#" onClick={this.openEditModal} disabled={this.state.selection === null}>Edit</Button>
                <Button href="#" onClick={this.openRemoveModal} disabled={this.state.selection === null}>Remove</Button>
              </ButtonGroup>
              <br/>
            </div> :
            null
          }
          {
            (list.length > 0) ?
            <Reorder
              reorderId={this.state.path.toString() + (new Date()).toString()}
              reorderGroup="reorder-group"
              component="div"
              lock="horizontal"
              holdTime={500}
              touchHoldTime={500}
              mouseHoldTime={150}
              onReorder={this.onReorder}
              autoScroll={true}
              disabled={!this.state.editting}
              placeholder={
                <div className="list-group-item placeholder">
                  Placeholder
                </div>
              }>
              {
                list.map((listItem, index) => {
                  if (listItem) {
                    const key = ((this.state.path.length > 1) ? this.state.courses.list.length : 0)
                      + ((this.state.path.length > 2) ? this.getPath().course.semesters.length : 0)
                      + ((this.state.path.length > 3) ? this.getPath().semester.assignments.length : 0)
                      + ((this.state.path.length > 4) ? this.getPath().assignment.problems.length : 0)
                      + index;
                    return (
                      <ListGroupItem
                        key={key}
                        active={this.state.selection === listItem.name}
                        onClick={() => this.handleSelect(listItem, index)}>
                        <div style={{fontSize: "medium"}}><b>{listItem.name}</b>: { getDate(listItem, index) }</div>
                        { (this.state.path.length === 1) ? <div>{ listItem.description }</div> : null }
                      </ListGroupItem>
                    );
                  } else {
                    return (
                      <ListGroupItem key={index}>
                        Failed to load
                      </ListGroupItem>
                    );
                  }
                })
              }
            </Reorder> :
            <div className="center">List is empty</div>
          }
        </Panel.Body>
      </Panel>
    );
  }

  getPage() {
    if (this.state.path.length === 5) {
      if (this.state.tempContent === "" && this.state.editting && this.getPath().problem.content !== "") {
        this.setState({ tempContent: this.getPath().problem.content });
      }
      return (
        <Panel>
          <Panel.Heading className="center" componentClass="h3">
            <Row className="show-grid">
              <Col sm={2}>

              </Col>
              <Col sm={8}>
                <b>{ this.state.path[1] } ({ this.state.path[2] })</b>: { this.state.path[3] } - { this.state.path[4] }
              </Col>
              <Col sm={2} className="right">
                { this.getEditButton() }
              </Col>
            </Row>
          </Panel.Heading>
          <Panel.Body>
            <DualEditor height={400}
              editting={this.state.editting}
              content={ (this.state.editting) ? this.state.tempContent : this.getPath().problem.content }
              onUpdate={content => this.setState({tempContent: content})} />
          </Panel.Body>
        </Panel>
      );
    }
  }

  getModals() {
    return (
      <div className="modal-container">
        { (this.state.showAddModal) ? this.getAddModal() : null }
        { (this.state.showCopyModal) ? this.getCopyModal() : null }
        { (this.state.showEditModal) ? this.getEditModal() : null }
        { (this.state.showRemoveModal) ? this.getRemoveModal() : null }
      </div>
    );
  }

  handleSelect(listItem, index) {
    if (!this.state.editting) {
      let state = {}
      if (this.getPath().assignment) {
        const problem = this.getPath().assignment.problems
          .find(problem => problem.name === listItem.name);
        this.setState({
          editting: true,
          tempContent: problem.content
        });
      }

      let path = [];
      this.state.path.forEach((item, index) => {
        if (index > 0) {
          path.push(item);
        }
      });
      path.push(listItem.name);
      this.props.match.history.push(path);
      this.goToPath(path);
    } else if (!this.state.dragged) {
      this.setState({ selection: (this.state.selection === listItem.name) ? null : listItem.name });
    } else {
      this.setState({ dragged: false });
    }
  }

  onReorder(event, previousIndex, nextIndex, fromId, toId) {
    // event.stopPropogation();
    switch (this.state.path.length) {
      case (2):
        this.props.editCourse(
          this.getPath().course, 
          { semesters: reorder(this.getPath().course.semesters, previousIndex, nextIndex).map(sem => sem._id) }
        );
        this.setState({
          selection: null,
          dragged: true
        });
        break;
      case (3):
        this.props.editSemester(
          this.getPath().course,
          this.getPath().semester,
          { assignments: reorder(this.getPath().semester.assignments, previousIndex, nextIndex).map(ass => ass._id) }
        );
        this.setState({
          selection: null,
          dragged: true
        });
        break;
      case (4):
        this.props.editAssignment(
          this.getPath().course,
          this.getPath().semester,
          this.getPath().assignment,
          { problems: reorder(this.getPath().assignment.problems, previousIndex, nextIndex).map(prob => prob._id) }
        );
        this.setState({
          dragged: previousIndex > nextIndex
        });
        break;
      default:
        break;
    }
  }

  openAddModal() {
    this.setState({
      showAddModal: true
    });
  }

  openCopyModal() {
    this.setState({
      showCopyModal: true
    });
  }

  openEditModal() {
    this.setState({
      showEditModal: true
    });
  }

  openRemoveModal() {
    this.setState({
      showRemoveModal: true
    });
  }

  getAddModal() {
    const inputs = {
      name: {
        id: "name",
        label: "Name",
        help: `Please provide the name of the ${this.getTitle()} you wish to add.`
      }
    }
    if (this.state.path.length === 1) {
      inputs.full_name = {
        id: "full_name",
        label: "Full Name",
        value: "",
        help: `Please provide the full name of the course you wish to add.`
      }
      inputs.description = {
        id: "description",
        label: "Description",
        type: "textarea",
        value: "",
        help: `Please provide the description of the course you wish to add.`
      }
    } else if (this.state.path.length === 2) {
      inputs.startDate = {
        id: "startDate",
        label: "Start Date",
        type: "datepicker",
        value: (new Date()).toISOString(),
        help: `Please provide the start date of the semester you wish to add.`
      }
    } else if (this.state.path.length === 3) {
      inputs.description = {
        id: "description",
        label: "Description",
        type: "textarea",
        value: "",
        help: `Please provide the description of the assignment you wish to add.`
      }
    } else if (this.state.path.length === 4) {
      const semester = this.getPath().semester;
      const date = new Date(semester.startDate.getTime());
      date.setDate(date.getDate() + semester.assignments.findIndex(assignment => assignment.name === this.state.path[3]) * 7);
      inputs.dayOffset = {
        id: "dayOffset",
        label: "Due Date",
        type: "datepicker",
        value: date.toISOString(),
        help: `Please provide the due date of the problem you wish to add.`
      }
    }

    return (
      <ModalForm
        title={`Add ${this.getTitle()}`}
        show={this.state.showAddModal}
        handleHide={() => {this.setState({showAddModal: false})}}
        handleSubmit={this.handleAddSubmit}
        inputs={inputs} />
    )
  }

  getCopyModal() {
    const inputs = {
      name: {
        id: "name",
        label: "Name",
        help: `Please provide the name of the ${this.getTitle()} you wish to add as a copy.`
      }
    }

    if (this.state.path.length === 1 && this.getPath().course) {
      const course = this.getPath().course;
      inputs.name.value = `Copy of ${course.name}`;
      inputs.full_name = {
        id: "full_name",
        label: "Full Name",
        value: course.full_name,
        help: `Please provide the full name of the course you wish to add.`
      }
      inputs.description = {
        id: "description",
        label: "Description",
        type: "textarea",
        value: course.description,
        help: `Please provide the description of the course you wish to add.`
      }
    } else if (this.state.path.length === 2 && this.getPath().semester) {
      const semester = this.getPath().semester;
      inputs.name.value = `Copy of ${semester.name}`;
      inputs.startDate = {
        id: "startDate",
        label: "Start Date",
        type: "datepicker",
        value: semester.startDate.toISOString(),
        help: `Please provide the start date of the semester you wish to add as a copy.`
      }
    } else if (this.state.path.length === 3 && this.getPath().assignment) {
      const assignment = this.getPath().assignment;
      inputs.name.value = `Copy of ${assignment.name}`;
      inputs.description = {
        id: "description",
        label: "Description",
        type: "textarea",
        value: assignment.description,
        help: `Please provide the description of the assignment you wish to add.`
      }
    } else if (this.state.path.length === 4 && this.getPath().problem) {
      const problem = this.getPath().problem;
      inputs.name.value = `Copy of ${problem.name}`;
      const semester = this.getPath().semester;
      const date = new Date(semester.startDate.getTime());
      date.setDate(date.getDate() + semester.assignments.findIndex(assignment => assignment.name === this.state.path[3]) * 7 + problem.dayOffset);
      inputs.dayOffset = {
        id: "dayOffset",
        label: "Due Date",
        type: "datepicker",
        value: date.toISOString(),
        help: `Please provide the due date of the problem you wish to add as a copy.`
      }
    }

    return (
      <ModalForm
        title={`Copy ${this.getTitle()}`}
        show={this.state.showCopyModal}
        handleHide={() => {this.setState({showCopyModal: false})}}
        handleSubmit={this.handleCopySubmit}
        inputs={inputs} />
    )
  }

  getEditModal() {
    const inputs = {
      name: {
        id: "name",
        label: "Name",
        help: `Please provide the name of the ${this.getTitle()} you wish to edit.`
      }
    }
    if (this.state.path.length === 1 && this.getPath().course) {
      const course = this.getPath().course;
      inputs.name.value = course.name;
      inputs.full_name = {
        id: "full_name",
        label: "Full Name",
        value: course.full_name,
        help: `Please provide the full name of the course you wish to add.`
      }
      inputs.description = {
        id: "description",
        label: "Description",
        type: "textarea",
        value: course.description,
        help: `Please provide the description of the course you wish to add.`
      }
    } else if (this.state.path.length === 2 && this.getPath().semester) {
      const semester = this.getPath().semester;
      inputs.name.value = semester.name;
      inputs.startDate = {
        id: "startDate",
        label: "Start Date",
        type: "datepicker",
        value: semester.startDate.toISOString(),
        help: `Please provide the start date of the semester you wish to edit.`
      }
    } else if (this.state.path.length === 3 && this.getPath().assignment) {
      const assignment = this.getPath().assignment;
      inputs.name.value = assignment.name;
      inputs.description = {
        id: "description",
        label: "Description",
        type: "textarea",
        value: assignment.description,
        help: `Please provide the description of the assignment you wish to add.`
      }
    } else if (this.state.path.length === 4 && this.getPath().problem) {
      const problem = this.getPath().problem;
      inputs.name.value = problem.name;
      const semester = this.getPath().semester;
      const date = new Date(semester.startDate.getTime());
      date.setDate(date.getDate() + semester.assignments.findIndex(assignment => assignment.name === this.state.path[3]) * 7 + problem.dayOffset);
      inputs.dayOffset = {
        id: "dayOffset",
        label: "Due Date",
        type: "datepicker",
        value: date.toISOString(),
        help: `Please provide the due date of the problem you wish to edit.`
      }
    }

    return (
      <ModalForm
        title={`Edit ${this.getTitle()}`}
        show={this.state.showEditModal}
        handleHide={() => {this.setState({showEditModal: false})}}
        handleSubmit={this.handleEditSubmit}
        inputs={inputs} />
    )
  }

  getRemoveModal() {
    return (
      <ModalForm
        title={`Delete ${this.getTitle()}`}
        show={this.state.showRemoveModal}
        handleHide={() => {this.setState({showRemoveModal: false})}}
        handleSubmit={this.handleRemoveSubmit}
        text={`Are you sure you want to delete the following ${this.getTitle()}: ${this.state.selection}`} />
    );
  }

  handleAddSubmit(outputs) {
    switch (this.state.path.length) {
      case (1):
        this.props.addCourse({
          name: outputs.name,
          full_name: outputs.full_name,
          description: outputs.description,
          semesters: []
        }).then(() => this.setState({ showAddModal: false, selection: outputs.name }));
        break;
      case (2):
        this.props.addSemester(
          this.getPath().course,
          {
            name: outputs.name,
            startDate: new Date(Date.parse(outputs.startDate)),
            assignments: []
          }
        ).then(() => this.setState({ showAddModal: false, selection: outputs.name }));
        break;
      case (3):
        this.props.addAssignment(
          this.getPath().course,
          this.getPath().semester,
          {name: outputs.name, description: outputs.description, problems: []}
        ).then(() => this.setState({ showAddModal: false, selection: outputs.name }));
        break;
      case (4):
        const date = new Date(Date.parse(outputs.dayOffset));
        const dayOffset = Math.round(date.getTime() / 86400000
          - this.getPath().semester.startDate.getTime() / 86400000
          - this.getPath().semester.assignments.findIndex(ass => ass.name === this.getPath().assignment.name) * 7);
        this.props.addProblem(
          this.getPath().course,
          this.getPath().semester,
          this.getPath().assignment,
          {
            name: outputs.name,
            dayOffset: dayOffset
          }
        ).then(() => this.setState({ showAddModal: false, selection: outputs.name }));
        break;
      default:
        break;
    }
  }

  // TODO: this needs support from server to copy nested objects
  handleCopySubmit(outputs) {
    switch (this.state.path.length) {
      case (1):
        this.props.addCourse({
          name: outputs.name,
          full_name: outputs.full_name,
          description: outputs.description,
          semesters: []
        }).then(() => this.setState({ showCopyModal: false, selection: outputs.name }));
        break;
      case (2):
        this.props.addSemester(
          this.getPath().course,
          {
            name: outputs.name,
            startDate: new Date(Date.parse(outputs.startDate)),
            assignments: []
          }
        ).then(() => this.setState({ showCopyModal: false, selection: outputs.name }));
        break;
      case (3):
        this.props.addAssignment(
          this.getPath().course,
          this.getPath().semester,
          {name: outputs.name, description: outputs.description, problems: []}
        ).then(() => this.setState({ showCopyModal: false, selection: outputs.name }));
        break;
      case (4):
        const date = new Date(Date.parse(outputs.dayOffset));
        const dayOffset = Math.round(date.getTime() / 86400000
          - this.getPath().semester.startDate.getTime() / 86400000
          - this.getPath().semester.assignments.findIndex(ass => ass.name === this.getPath().assignment.name) * 7);
        this.props.addProblem(
          this.getPath().course,
          this.getPath().semester,
          this.getPath().assignment,
          {
            name: outputs.name,
            dayOffset: dayOffset,
            content: this.getPath().problem.content
          }
        ).then(() => this.setState({ showCopyModal: false, selection: outputs.name }));
        break;
      default:
        break;
    }
  }

  handleEditSubmit(outputs) {
    let { semester, assignment, problem } = this.getPath();
    switch (this.state.path.length) {
      case (1):
        this.props.editCourse(
          this.getPath().course,
          { name: outputs.name, full_name: outputs.full_name, description: outputs.description }
        ).then(() => this.setState({ showEditModal: false, selection: outputs.name }));
        break;
      case (2):
        this.props.editSemester(
          this.getPath().course,
          this.getPath().semester,
          { name: outputs.name, startDate: new Date(Date.parse(outputs.startDate)) }
        ).then(() => this.setState({ showEditModal: false, selection: outputs.name }));
        break;
      case (3):
        this.props.editAssignment(
          this.getPath().course,
          this.getPath().semester,
          this.getPath().assignment,
          { name: outputs.name, description: outputs.description }
        ).then(() => this.setState({ showEditModal: false, selection: outputs.name }));
        break;
      case (4):
        const date = new Date(Date.parse(outputs.dayOffset));
        const dayOffset = Math.round(date.getTime() / 86400000
          - this.getPath().semester.startDate.getTime() / 86400000
          - this.getPath().semester.assignments.findIndex(ass => ass.name === this.getPath().assignment.name) * 7);
        this.props.editProblem(
          this.getPath().course,
          this.getPath().semester,
          this.getPath().assignment,
          this.getPath().problem,
          {
            name: outputs.name,
            dayOffset: dayOffset
          }
        ).then(() => this.setState({ showEditModal: false, selection: outputs.name }));  
        break;
      default:
        break;
    }
  }

  handleRemoveSubmit(outputs) {
    switch (this.state.path.length) {
      case (1):
        this.props.deleteCourse(
          this.getPath().course
        ).then(() => {
          this.setState({
            showRemoveModal: false,
            selection: null
          });
        });
        break;
      case (2):
        this.props.deleteSemester(
          this.getPath().course, 
          this.getPath().semester
        ).then(() => {
          this.setState({
            showRemoveModal: false,
            selection: null
          });
        });
        break;
      case (3):
        this.props.deleteAssignment(
          this.getPath().course, 
          this.getPath().semester, 
          this.getPath().assignment
        ).then(() => {
          this.setState({
            showRemoveModal: false,
            selection: null
          });
        });
        break;
      case (4):
        this.props.deleteProblem(
          this.getPath().course, 
          this.getPath().semester, 
          this.getPath().assignment, 
          this.getPath().problem
        ).then(() => {
          this.setState({
            showRemoveModal: false,
            selection: null
          });
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className="Homework">
        <Breadcrumb>
          {
            this.state.path.map((item, index) => {
              if (index < this.state.path.length - 1) {
                return (
                  <Breadcrumb.Item key={index}
                    onClick={() => {
                      this.setState({ editting: false, selection: null });
                      this.goToPath(this.state.path.slice(1, index+1));
                    }}>
                    {item}
                  </Breadcrumb.Item>
                );
              } else {
                return (
                  <Breadcrumb.Item key={index} active>
                    {item}
                  </Breadcrumb.Item>
                );
              }
            })
          }
        </Breadcrumb>
        { this.getContent() }
        { this.getModals() }
      </div>
    );
  }
}


const mapStateToProps = state => {
  const assignments = { ...state.assignments, list: state.assignments.list.map(assignment => { return { ...assignment, problems: [] } }) };
  state.assignments.list.forEach((assignment, index) => {
    assignment.problems.forEach(prob_id => {
      let prob = state.problems.list.find(prob => prob._id === prob_id);
      if (prob) {
        assignments.list[index].problems.push(prob);
      }
    });
  });
  const semesters = { ...state.semesters, list: state.semesters.list.map(semester => { return { ...semester, assignments: [] } }) };
  state.semesters.list.forEach((semester, index) => {
    if (typeof semester.startDate === 'string') {
      semesters.list[index].startDate = new Date(Date.parse(semester.startDate));
    }
    semester.assignments.forEach(ass_id => {
      let ass = assignments.list.find(ass => ass._id === ass_id);
      if (ass) {
        semesters.list[index].assignments.push(ass);
      }
    });
  });
  const courses = { ...state.courses, list: state.courses.list.map(course => { return { ...course, semesters: [] } }) };
  state.courses.list.forEach((course, index) => {
    courses.list[index].name = course.name;
    courses.list[index].full_name = course.full_name;
    courses.list[index].description = course.description;
    course.semesters.forEach(sem_id => {
      let sem = semesters.list.find(sem => sem._id === sem_id);
      if (sem) {
        courses.list[index].semesters.push(sem);
      }
    })
  });

  return {
    courses: courses
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    addCourse: course => DispatchAddCourse(dispatch, course),
    editCourse: (course_name, course) => DispatchEditCourse(dispatch, course_name, course),
    deleteCourse: course => DispatchDeleteCourse(dispatch, course),
    addSemester: (course, semester) => DispatchAddSemester(dispatch, course, semester),
    editSemester: (course, semester_name, semester) => DispatchEditSemester(dispatch, course, semester_name, semester),
    deleteSemester: (course, semester) => DispatchDeleteSemester(dispatch, course, semester),
    addAssignment: (course, semester, assignment) => DispatchAddAssignment(dispatch, course, semester, assignment),
    editAssignment: (course, semester, assignment_name, assignment) => DispatchEditAssignment(dispatch, course, semester, assignment_name, assignment),
    deleteAssignment: (course, semester, assignment) => DispatchDeleteAssignment(dispatch, course, semester, assignment),
    addProblem: (course, semester, assignment, problem) => DispatchAddProblem(dispatch, course, semester, assignment, problem),
    editProblem: (course, semester, assignment, old_problem, problem) => DispatchEditProblem(dispatch, course, semester, assignment, old_problem, problem),
    deleteProblem: (course, semester, assignment, problem) => DispatchDeleteProblem(dispatch, course, semester, assignment, problem)
  }
}

export default Homework = connect(mapStateToProps, mapDispatchToProps)(Homework);
