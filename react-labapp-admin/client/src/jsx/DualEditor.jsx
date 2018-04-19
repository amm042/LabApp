import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import AceEditor from 'react-ace';
import pretty from 'pretty';

import 'brace/mode/html';
import 'brace/theme/chrome';

import 'react-quill/dist/quill.snow.css';

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
const MODULES = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike'],
    ['color', 'background'],
    ['blockquote', 'code-block', 'formula'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const FORMATS = [
  'header', 'font', 'size', 'align', 'direction',
  'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
  'list', 'bullet', 'indent', 'formula', 'color', 'background',
  'link', 'image', 'video'
]

class DualEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      mode: props.mode || "editor",
      content: props.content,
      editting: props.editting,
    }

    this.updateContent = props.onUpdate;
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleModeSelect = this.handleModeSelect.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode || "editor",
      content: nextProps.content,
      editting: nextProps.editting,
    })
  }

  handleEditorChange(html) {
  	this.updateContent(html);
  }

  handleModeSelect(mode) {
    this.setState({ mode, content: pretty(this.state.content) });
  }

  render() {
    if (this.state.editting) {
      return (
        <div className="DualEditor">
          <Nav justified bsStyle="pills" activeKey={1} onSelect={this.handleModeSelect}>
            <NavItem eventKey={"editor"} active={this.state.mode === "editor"}>
              GUI Editor
            </NavItem>
            <NavItem eventKey={"raw"} active={this.state.mode === "raw"}>
              Raw HTML Editor
            </NavItem>
          </Nav>
          {
            (this.state.mode === "editor") ?
              <ReactQuill
                onChange={this.handleEditorChange}
                value={this.state.content}
                style={{height: this.props.height - 45}}
                modules={MODULES}
                formats={FORMATS} /> :
              <AceEditor
                mode="html"
                theme="chrome"
                setReadOnly={false}
                ref={instance => { this.ace = instance; }}
                value={this.state.content}
                tabSize={4}
                wrapEnabled={true}
                style={{height: this.props.height, width: "100%", border: "1px solid #ddd"}}
                onChange={this.handleEditorChange}/>
          }
        </div>
      );
    } else {
      return (
        <div className="DualEditor" dangerouslySetInnerHTML={{__html: this.state.content ||
            "<p style='text-align: center; vertical-align: middle; height: 100%;'>Nothing to show</p>"}} />
      );
    }
  }

}

export default DualEditor;
