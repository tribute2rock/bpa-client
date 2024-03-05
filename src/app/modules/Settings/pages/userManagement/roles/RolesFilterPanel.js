/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { SubmitButton } from "../../../../../components/Buttons";

const status = [{ title: "Active" }, { title: "Inactive" }];

export function RolesFilterPanel() {
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
              <Form.Label>Status</Form.Label>
              <Autocomplete
                id="combo-box-demo"
                options={status}
                className="form-control pt-2"
                getOptionLabel={(option) => option.title}
                renderInput={(params) => <TextField {...params} />}
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
