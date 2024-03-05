/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { Dropdown } from "react-bootstrap";
import { DropdownCustomToggler, DropdownMenu1 } from "../../dropdowns";

export function ListsWidget9({ className }) {
  return (
    <>
      <div className={`card card-custom  ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">
              Upcoming Requests
            </span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">
              103 Requests
            </span>
          </h3>
          <div className="card-toolbar">
            <Dropdown className="dropdown-inline" alignRight>
              <Dropdown.Toggle
                id="dropdown-toggle-top"
                as={DropdownCustomToggler}
              >
                <i className="ki ki-bold-more-hor" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
                <DropdownMenu1 />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {/* Body */}
        <div className="card-body pt-4">
          <div className="timeline timeline-6 mt-3">
            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                08:42
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-warning icon-xl"></i>
              </div>

              <div className="font-weight-mormal font-size-lg timeline-content pl-3">
                <a href="#" className="text-primary">
                  #26535
                </a>{" "}
                Ram Bahadur (A/C 1234567890) requested for New card
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                10:00
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-success icon-xl"></i>
              </div>

              <div className="timeline-content d-flex">
                <span className="font-weight-mormal text-dark-75 pl-3 font-size-lg">
                  <a href="#" className="text-primary">
                    #26535
                  </a>{" "}
                  Ram Bahadur (A/C 1234567890) requested for New card
                </span>
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                14:37
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-danger icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-mormal font-size-lg text-dark-75 pl-3">
                <a href="#" className="text-primary">
                  #26535
                </a>{" "}
                Ram Bahadur (A/C 1234567890) requested for New card
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                16:50
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-primary icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-mormal font-size-lg pl-3">
                <a href="#" className="text-primary">
                  #26535
                </a>{" "}
                Ram Bahadur (A/C 1234567890) requested for New card
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                21:03
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-danger icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-mormal text-dark-75 pl-3 font-size-lg">
                <a href="#" className="text-primary">
                  #26535
                </a>{" "}
                Ram Bahadur (A/C 1234567890) requested for New card
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                23:07
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-info icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-mormal font-size-lg pl-3">
                <a href="#" className="text-primary">
                  #26535
                </a>{" "}
                Ram Bahadur (A/C 1234567890) requested for New card
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                16:50
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-primary icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-mormal font-size-lg pl-3">
                <a href="#" className="text-primary">
                  #26535
                </a>{" "}
                Ram Bahadur (A/C 1234567890) requested for New card
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg">
                21:03
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-danger icon-xl"></i>
              </div>

              <div className="timeline-content font-weight-mormal font-size-lg text-dark-75 pl-3">
                <a href="#" className="text-primary">
                  #26535
                </a>{" "}
                Ram Bahadur (A/C 1234567890) requested for New card
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
