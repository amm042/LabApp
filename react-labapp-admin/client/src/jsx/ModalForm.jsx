import React, { Component } from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import _ from 'lodash';
import DatePicker from 'react-bootstrap-date-picker';

function FieldGroup({ id, label, help, ...props }) {
  if (props.type === "datepicker") {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <DatePicker id={id} value={props.value} onChange={props.onChange} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  } else {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }
}

class ModalForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      inputs: props.inputs,
      show: props.show,
      text: props.text,
      loading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleSubmit = props.handleSubmit;
    this.handleHide = props.handleHide.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      inputs: nextProps.inputs,
      show: nextProps.show,
      text: nextProps.text
    });
  }

  handleHide() {
    this.setState({ show: false });
  }

  getInputs() {
    return _.map(this.state.inputs, (input, key) => {
      return (
        <FieldGroup
          key={key}
          id={key}
          label={input.label}
          help={input.help}
          type={input.type}
          value={input.value || ((input.type === 'datepicker') ? new Date().toISOString() : "")}
          onChange={(event) => {
            const inputs = this.state.inputs;
            inputs[key] = { ...inputs[key], value: (input.type === 'datepicker') ? event : event.target.value };
            this.setState({inputs});
          }} />
      );
    });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    const outputs = {};
    _.forEach(this.state.inputs, (input, id) => {
      outputs[input.id] = input.value;
    });
    this.handleSubmit(outputs);
  }

  render() {
    return (
        <Modal show={this.state.show} onHide={this.handleHide} container={this}>
          <form onSubmit={this.onSubmit}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>{this.state.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{ this.state.text }</p>
              { this.getInputs() }
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.handleHide}>Close</Button>
              <Button type="submit" bsStyle="primary" disabled={this.state.loading}>{ (this.state.loading) ? "Loading" : "Submit" }</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </form>
      </Modal>
    );
  }
}

export default ModalForm;
