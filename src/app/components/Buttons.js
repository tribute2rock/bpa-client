import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'reactstrap';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const AddButton = props => {
  return (
    <NavLink to={props.to}>
      <Button color="primary">{props.value}</Button>
    </NavLink>
  );
};

const BackButton = props => {
  return (
    <NavLink to={props.to}>
      <button type="button" className="btn btn-light">
        <i className="fa fa-arrow-left" />
        Back
      </button>
    </NavLink>
  );
};

const PrintButton = props => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">Print</Tooltip>}>
      <div className="ml-3 btn btn-light" onClick={props.handlePrint}>
        <i className="fas fa-print"></i>
      </div>
    </OverlayTrigger>
  );
};

const PickButton = props => {
  const [clicked, setClicked] = useState(false); // Add state variable for clicked status

  const handlePick = () => {
    setClicked(true); // Set clicked status to true when button is clicked
    props.handlePick();
  };

  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">Pick</Tooltip>}>
      <div
        className={`btn btn-icon mr-2 btn-light btn-hover-secondary btn-sm ${clicked ? 'bg-success' : ''}`}
        onClick={handlePick}
      >
        <i className="fas fa-hand-lizard"></i>
      </div>
    </OverlayTrigger>
  );
};

const VoidButton = props => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">Void</Tooltip>}>
      <div className="btn btn-icon mr-2 btn-light btn-hover-secondary btn-sm" onClick={props.handleVoid}>
        <i className="fas fa-window-close" />
      </div>
    </OverlayTrigger>
  );
};

const CloneButton = props => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">Clone</Tooltip>}>
      <div className="btn btn-icon mr-2 btn-light btn-hover-secondary btn-sm" onClick={props.handleClone}>
        <i className="fas fa-clone" />
      </div>
    </OverlayTrigger>
  );
};

const SaveButton = props => {
  return (
    <button type="button" className="btn btn-light ml-2" onClick={props.handleSave}>
      <i className={props.value === 'Update' ? 'fa fa-sync' : 'fas fa-save'} />
      {props.value}
    </button>
  );
};

const DeleteButton = props => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">Delete</Tooltip>}>
      <div className="btn btn-icon btn-light btn-hover-danger btn-sm" onClick={props.handleClick}>
        <i className="fas fa-trash text-danger" />
      </div>
    </OverlayTrigger>
  );
};

const EditButton = props => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">Edit</Tooltip>}>
      <NavLink to={props.to} className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
        <i className="fa fa-edit text-primary" />
      </NavLink>
    </OverlayTrigger>
  );
};

const ViewButton = props => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">View</Tooltip>}>
      <NavLink to={props.to + props.id} className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3">
        <i className="fas fa-eye text-primary" />
      </NavLink>
    </OverlayTrigger>
  );
};

const SkipButton = props => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">Skip</Tooltip>}>
      <div className="btn btn-icon btn-light btn-hover-info btn-sm">
        <i className="fas fa-step-forward text-info" />
      </div>
    </OverlayTrigger>
  );
};

const FilterButton = props => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">Filter</Tooltip>}>
      <div className="btn btn-icon btn-clean btn-lg mr-1" id={props.id}>
        <i className="fa fa-filter text-primary" />
      </div>
    </OverlayTrigger>
  );
};

const SubmitButton = props => {
  return (
    <Button color={props.color || 'primary'} onClick={props.handleSubmit} type={props.type}>
      {props.value}
    </Button>
  );
};

const ResetButton = props => {
  return (
    <Button className="mr-3  btn btn-light" color="secondary" onClick={props.handleReset}>
      <i className="fa fa-redo" />
      {props.value}
    </Button>
  );
};

const NextButton = props => {
  return (
    <button type="button" className="ml-3  btn btn-light" onClick={props.handleNext}>
      <i className="fa fa-arrow-right" />
      Next
    </button>
  );
};

const PreviousButton = props => {
  return (
    <button type="button" className="ml-3 btn btn-light" onClick={props.handlePrevious}>
      <i className="fa fa-arrow-left" />
      Previous
    </button>
  );
};

const RollBackButton = props => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">Roll-Back</Tooltip>}>
      <div className="btn btn-icon mr-2 btn-light btn-hover-secondary btn-sm" onClick={props.handleRoleBack}>
        <i className="fa fa-reply"></i>
      </div>
    </OverlayTrigger>
  );
};

const CopyLinkButton = props => {
  return (
    <OverlayTrigger placement="bottom" overlay={<Tooltip id="quick-panel-tooltip">Copy Link For Testing</Tooltip>}>
      <div className="btn btn-icon mr-0 ml-15 btn-light btn-hover-secondary btn-sm" onClick={props.handleClick}>
        <i className="fa fa-clipboard"></i>
      </div>
    </OverlayTrigger>
  );
};

export {
  AddButton,
  BackButton,
  SaveButton,
  DeleteButton,
  EditButton,
  ViewButton,
  PickButton,
  VoidButton,
  CloneButton,
  SkipButton,
  FilterButton,
  SubmitButton,
  ResetButton,
  NextButton,
  PreviousButton,
  PrintButton,
  RollBackButton,
  CopyLinkButton
};
