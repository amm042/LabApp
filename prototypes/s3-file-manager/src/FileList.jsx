import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { Card, CardText, CardBody, CardSubtitle,
  CardTitle, Button } from 'reactstrap';
import {Modal, ModalBody, ModalFooter,ModalHeader} from 'reactstrap';

const Icons = require('react-icons/lib/md')

const moment = require('moment');
const filesize = require('filesize')

class FileRow extends Component{
  // this has to be a react component
  // so it can have the unique key prop.
  render(){
    let fi =this.props.fileinfo
    let d = Date.parse(fi.LastModified)
    return (
      <tr>
        <th key={"num."+fi.Key} scope="row" >{this.props.index}</th>
        <td key={"key."+fi.Key} >{fi.Key}</td>
        <td key={"mod."+fi.Key} >{moment(d).fromNow()}</td>
        <td key={"size."+fi.Key} >{filesize(fi.Size)}</td>
        <td key={"get."+fi.Key} >
          <a href={this.props.url} target="_blank">
            <Button color="primary" size="sm">Get</Button>
          </a>
        </td>
      </tr>
    )
  }
}

export default class FileList extends Component{
  constructor(props){
    super(props)
    this.state = {files: [],
      error: null,
      showUploadModal: false
    }
    this.refreshFiles = this.refreshFiles.bind(this)
    this.toggleFileUploadDialog = this.toggleFileUploadDialog.bind(this)
  }
  toggleFileUploadDialog(){
    this.setState({showUploadModal: !this.state.showUploadModal})
  }
  refreshFiles(){
    this.setState({files:[]})
    fetch(this.props.host+'/')
    .then(r => r.json())
    .then(files => {
      this.setState({files: files.Contents})
    })
    .catch(err => {
      this.setState({error:err})
    })

  }
  componentWillMount(){
    this.refreshFiles()
  }
  render(){
    let rows = this.state.files.map( (fileinfo, idx) =>{
      let url = this.props.host+'/'+fileinfo.Key
      return (
        <FileRow
          key={fileinfo.Key}
          fileinfo={fileinfo}
          index={idx}
          url={url}
        />
      )
    })



    var uploadModal = (
      <Modal isOpen={this.state.showUploadModal}
        toggle={this.toggleFileUploadDialog}>
        <ModalHeader toggle={this.toggleFileUploadDialog}>Upload file</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={this.toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    )

    var fileListCard = (
      <Card>
        {uploadModal}
        <CardBody>
          <CardTitle>File List for {this.props.bucket}</CardTitle>
          {this.state.files.length === 1 ? (
            <CardSubtitle>There is {this.state.files.length} file.</CardSubtitle>
          ):(
            <CardSubtitle>There are {this.state.files.length} files.</CardSubtitle>
          )}
          <CardText></CardText>
            <div>
              <Table size="sm" striped>
                <thead>
                  <tr>
                    <th key="num.head">#</th>
                    <th key="num.name">Name</th>
                    <th key="num.mod">Modified</th>
                    <th key="num.size">Size</th>
                    <th key="num.link">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
              </Table>
              <div>
                <Button color="success"
                  onClick={this.toggleFileUploadDialog}>
                  <Icons.MdAddCircle/>
                  Add File
                </Button>
                <Button className="float-right" color="primary"
                  onClick={this.refreshFiles}>
                  <Icons.MdSync/>
                  Refresh List
                </Button>
              </div>
            </div>

        </CardBody>
      </Card>
    )

    return this.state.error === null ? fileListCard : (<Card>
            <CardBody>
              <CardTitle className="text-danger">Error</CardTitle>
              <CardText>{this.state.error.toString()}</CardText>
            </CardBody>
          </Card>)

  }
}
