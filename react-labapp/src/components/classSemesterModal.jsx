import React, { Component } from 'react'
import {Button, Modal, ModalBody, ModalFooter,ModalHeader} from 'reactstrap'

import {Form, FormGroup, Label, Input} from 'reactstrap'

import {withRouter} from 'react-router'

import {FaHandSpockO} from 'react-icons/lib/fa'

import './classSemesterModal.css'
class ClassSemesterModal extends Component{
  constructor(props){
    super(props)
    this.state={
        show: true,
        cache: '',
        selectedCourse: '',
        selectedSemester: '',
        courses: { // TODO get this from backend.
            'CSCI203':['SP2018','FA2018'],
            'CSCI204': ['SP2018']
          }}
    this.go = this.go.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.validate = this.validate.bind(this)
  }
  componentWillMount(){
    this.validate()
  }
  componentDidUpdate(){
    //console.log("update", this.props.location.pathname, this.props.match.params, this.state.cache)
    let c = this.props.match.params.course
    let s = this.props.match.params.semester
    let cstr = c+'-'+s

    if (cstr !== this.state.cache){
      this.validate()
    }
  }
  validate(){
    //fetch course/semesters and then
    //select the default course/semester on load
    //console.log('validating', this.props.match.params)
    let c = this.props.match.params.course
    let s = this.props.match.params.semester
    this.setState({cache: c+'-'+s})
    if (c in this.state.courses){
      if (this.state.courses[c].indexOf(s) >= 0){
        //console.log("looks good!")
        this.setState({
          selectedCourse: c,
          selectedSemester: s,
          show: false
        })
      }else{
        // course is valid but semester is not
        //console.log("semester is bad got", s, "not in",
        //  this.state.courses[c])
        s = this.state.courses[c][0]
        this.setState({
          selectedCourse:c,
          selectedSemester: s,
          show: true
        })
      }
    }else{
      // semester is not valid
      //console.log("course is bad")
      c = Object.keys(this.state.courses)[0]
      s = this.state.courses[c][0]
      this.setState({
        selectedCourse: c,
        selectedSemester: s,
        show: true
      })
    }


  }
  handleChange(e){
    // hanlde change events for all form Components
    let sobj = {}
    sobj[e.target.name] = e.target.value

    if (e.target.name === 'selectedCourse'){
      sobj['selectedSemester'] =
        this.state.courses[this.state.selectedCourse][0]
    }
    //console.log("CHANGE", sobj)
    this.setState(sobj)
  }
  go(e){
    e.preventDefault()
    //console.log("GO", this.state)
    this.props.history.push(
      '/'+this.state.selectedCourse+
      '/'+this.state.selectedSemester)
    //this.validate()
  }
  render(){

    return (
      <Modal isOpen={this.state.show}>
        <ModalHeader>
            <FaHandSpockO/>
        </ModalHeader>

        <ModalBody>
        <Form inline onSubmit={this.go}>
          <p>To continue please select the course and semester to access.</p>

            <FormGroup className="p-2 ml-auto">
              <Label for="course" className="p-2 mr-auto">Course</Label>
              <Input
                type="select"
                name="selectedCourse"
                value={this.state.selectedCourse}
                onChange={this.handleChange}>
                {Object.keys(this.state.courses).map(course => {
                  return (<option
                            key={course}
                            value={course}>{course}</option>)
                })}
              </Input>
            </FormGroup>
            <FormGroup className="p-2 mr-auto">
              <Label for="semester" className="p-2 ml-auto">Semester</Label>
              <Input
                type="select"
                name="selectedSemester"
                value={this.state.selectedSemester}
                onChange={this.handleChange}>
                {this.state.selectedCourse === '' ? null :
                  this.state.courses[this.state.selectedCourse].map(semester => {
                  return (<option
                            key={semester}
                            value={semester}>{semester}</option>)
                          }
                        )}
              </Input>
            </FormGroup>

            <Button
              className="p-2 m-auto btn btn-primary m-auto"
              color="primary"
              type="submit">Go!
            </Button>
          </Form>
        </ModalBody>

        <ModalFooter>

        </ModalFooter>

      </Modal>
      )
    }

}
export default withRouter(ClassSemesterModal)
