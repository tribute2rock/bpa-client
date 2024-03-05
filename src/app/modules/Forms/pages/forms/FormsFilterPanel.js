/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React, { useState } from "react";
import { Nav } from "react-bootstrap";

import { Button, Form, Col, Row } from "react-bootstrap";

import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SubmitButton } from "../../../../components/Buttons";

const categoryOptions = [{ title: "Debit Card" }, { title: "Credit Card" }];

const typeOptions = [{ title: "Dynamic" }, { title: "HTML" }];

const statusOptions = [{ title: "Published" }, { title: "Unpublished" }];

export function FormsFilterPanel() {
  const [selectedTab, setSelectedTab] = useState("TabLog");

  const setTab = (_tabName) => {
    setSelectedTab(_tabName);
  };
  return (
    <div id="kt_quick_panel" className="offcanvas offcanvas-right pt-5 pb-10">
      <div className="offcanvas-header offcanvas-header-navs d-flex align-items-center justify-content-between mb-5">
        <Nav
          onSelect={setTab}
          as="ul"
          role="tablist"
          className="nav nav-bold nav-tabs nav-tabs-line nav-tabs-line-3x nav-tabs-primary flex-grow-1 px-10"
        >
          <Nav.Item as="li">
            <Nav.Link
              eventKey="TabLog"
              className={`nav-link ${selectedTab === "TabLog" ? "active" : ""}`}
            >
              Filter Your Search
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <div
          className="offcanvas-close mt-n1 pr-5"
          style={{ position: "absolute", top: "15px", right: "10px" }}
        >
          <a
            href="#"
            className="btn btn-xs btn-icon btn-light btn-hover-primary"
            id="kt_quick_panel_close"
          >
            <i className="ki ki-close icon-xs text-muted"></i>
          </a>
        </div>
      </div>
      <div className="offcanvas-content px-10">
        <div className="tab-content">
          <div
            id="kt_quick_panel_logs"
            role="tabpanel"
            className={`tab-pane fade pt-3 pr-5 mr-n5 scroll ps ${
              selectedTab === "TabLog" ? "active show" : ""
            }`}
          >
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Category</Form.Label>
              <Autocomplete
                id="combo-box-demo"
                options={categoryOptions}
                className="form-control pt-2"
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select category" />
                )}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Form type</Form.Label>
              <Autocomplete
                id="combo-box-demo"
                options={typeOptions}
                className="form-control pt-2"
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select type" />
                )}
              />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Form status</Form.Label>
              <Autocomplete
                id="combo-box-demo"
                options={statusOptions}
                className="form-control pt-2"
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select status" />
                )}
              />
            </Form.Group>
            <div className="text-right">
              <SubmitButton value="Filter" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
