/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useEffect, useState } from 'react';
import SVG from 'react-inlinesvg';
import objectPath from 'object-path';
import ApexCharts from 'apexcharts';
import { Dropdown } from 'react-bootstrap';
import { toAbsoluteUrl } from '../../../_helpers';
import { useHtmlClassService } from '../../../layout';
import { DropdownMenu2 } from '../../dropdowns';
import { Link } from 'react-router-dom';
export function MixedWidget1({ className, countData, type, externalCount }) {
  // console.log('TYPEEE=>', type);
  // /internal-requests?type=internal
  const uiService = useHtmlClassService();

  const layoutProps = useMemo(() => {
    return {
      colorsGrayGray500: objectPath.get(uiService.config, 'js.colors.gray.gray500'),
      colorsGrayGray200: objectPath.get(uiService.config, 'js.colors.gray.gray200'),
      colorsGrayGray300: objectPath.get(uiService.config, 'js.colors.gray.gray300'),
      colorsThemeBaseDanger: objectPath.get(uiService.config, 'js.colors.theme.base.danger'),
      fontFamily: objectPath.get(uiService.config, 'js.fontFamily')
    };
  }, [uiService]);

  useEffect(() => {
    const element = document.getElementById('kt_mixed_widget_1_chart');
    if (!element) {
      return;
    }

    const options = getChartOptions(layoutProps);

    const chart = new ApexCharts(element, options);
    chart.render();
    return function cleanUp() {
      chart.destroy();
    };
  }, [layoutProps]);

  // const countRequests = () => {};
  return (
    <div className="card card-custom mb-3">
      {/* Header */}
      <div className="card-header bg-light py-5" style={{ border: '1px solid #E7E9F2' }}>
        <h3 className="card-title font-weight-bolder text-dark">{type} Requests Count</h3>
        {type == 'Internal' && (
          <>
            <div>
              <Link to="/internal-requests?type=internal" className="btn btn-secondary mr-2">
                Internal Request List
              </Link>
            </div>
          </>
        )}
        {/* <div className="card-toolbar">
          <Dropdown className="dropdown-inline" drop="down" alignRight>
            <Dropdown.Toggle
              className="btn btn-transparent-white btn-sm font-weight-bolder dropdown-toggle px-5"
              variant="transparent"
              id="dropdown-toggle-top">
              Export
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu dropdown-menu-sm dropdown-menu-right">
              <DropdownMenu2 />
            </Dropdown.Menu>
          </Dropdown>
        </div> */}
      </div>
      {/* Body */}
      <div className="card-body p-0 position-relative overflow-hidden">
        {/* Chart */}
        {/* <div id="kt_mixed_widget_1_chart" className="card-rounded-bottom bg-danger" style={{ height: '200px' }}></div> */}

        {/* Stat */}
        <div className="card-spacer">
          <div className="row m-0">
            {type == 'Customer' && (
              <Link
                to={{ pathname: '/requests', tab: 'Bucket' }}
                className="col text-secondary font-weight-bold font-size-h6"
              >
                <div className="bg-light-secondary px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                    <h2 className="text-secondary">{countData.bucket ? countData.bucket : 0}</h2>
                  </span>
                  Bucket
                </div>
              </Link>
            )}
            {type == 'Internal' && (
              <Link
                to={{ pathname: '/internal-requests', tab: 'Bucket', search: '?type=internal' }}
                className="col text-secondary font-weight-bold font-size-h6"
              >
                <div className="bg-light-secondary px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                    <h2 className="text-secondary">{countData.bucket ? countData.bucket : 0}</h2>
                  </span>
                  Bucket
                </div>
              </Link>
            )}

            {type == 'Customer' && (
              <Link
                to={{ pathname: '/requests', tab: 'Upcoming' }}
                className="col text-primary font-weight-bold font-size-h6 mt-2"
              >
                <div className="bg-light-primary px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                    <h2 className="text-primary">{countData.upcoming ? countData.upcoming : 0}</h2>
                  </span>
                  Upcoming
                </div>
              </Link>
            )}
            {type == 'Internal' && (
              <Link
                to={{ pathname: '/internal-requests', tab: 'Upcoming', search: '?type=internal' }}
                className="col text-secondary font-weight-bold font-size-h6"
              >
                <div className="bg-light-primary px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                    <h2 className="text-primary">{countData.upcoming ? countData.upcoming : 0}</h2>
                  </span>
                  Upcoming
                </div>
              </Link>
            )}

            {type == 'Customer' && (
              <Link
                to={{ pathname: '/requests', tab: 'Pending' }}
                className="col text-warning font-weight-bold font-size-h6"
              >
                <div className="bg-light-warning px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                    <h2 className="text-warning">{countData.pending ? countData.pending : 0}</h2>
                  </span>
                  Pending
                </div>
              </Link>
            )}
            {type == 'Internal' && (
              <Link
                to={{ pathname: '/internal-requests', tab: 'Pending', search: '?type=internal' }}
                className="col text-warning font-weight-bold font-size-h6"
              >
                <div className="bg-light-warning px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                    <h2 className="text-warning">{countData.pending ? countData.pending : 0}</h2>
                  </span>
                  Pending
                </div>
              </Link>
            )}
            {type == 'Customer' && (
              <Link
                to={{ pathname: '/requests', tab: 'Approved' }}
                className="col text-success font-weight-bold font-size-h6 mt-2"
              >
                <div className="bg-light-success px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                    <h2 className="text-success">{countData.approved ? countData.approved : 0}</h2>
                  </span>
                  Approved
                </div>
              </Link>
            )}
            {type == 'Internal' && (
              <Link
                to={{ pathname: '/internal-requests', tab: 'Approved', search: '?type=internal' }}
                className="col text-success font-weight-bold font-size-h6"
              >
                <div className="bg-light-success px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                    <h2 className="text-success">{countData.approved ? countData.approved : 0}</h2>
                  </span>
                  Approved
                </div>
              </Link>
            )}

            {type == 'Customer' && (
              <Link
                to={{ pathname: '/requests', tab: 'Returned' }}
                className="col text-danger font-weight-bold font-size-h6 mt-2"
              >
                <div className="bg-light-danger px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                    <h2 className="text-danger">{countData.returned ? countData.returned : 0}</h2>
                  </span>
                  Returned
                </div>
              </Link>
            )}
            {type == 'Internal' && (
              <Link
                to={{ pathname: '/internal-requests', tab: 'Returned', search: '?type=internal' }}
                className="col text-danger font-weight-bold font-size-h6"
              >
                <div className="bg-light-danger px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                    <h2 className="text-danger">{countData.returned ? countData.returned : 0}</h2>
                  </span>
                  Returned
                </div>
              </Link>
            )}

            {type == 'Corporate Registration' && (
              <Link
                to={{ pathname: '/corporate-requests', tab: 'Bucket', search: '?type=corporate' }}
                className="col text-secondary font-weight-bold font-size-h6"
              >
                <div className="bg-light-secondary px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                    <h2 className="text-secondary">{countData.bucket ? countData.bucket + externalCount.bucket : 0}</h2>
                  </span>
                  Bucket
                </div>
              </Link>
            )}

            {type == 'Corporate Registration' && (
              <Link
                to={{ pathname: '/corporate-requests', tab: 'Upcoming', search: '?type=corporate' }}
                className="col text-primary font-weight-bold font-size-h6 mt-2"
              >
                <div className="bg-light-primary px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                    <h2 className="text-primary">{countData.upcoming ? countData.upcoming + externalCount.bucket : 0}</h2>
                  </span>
                  Upcoming
                </div>
              </Link>
            )}

            {type == 'Corporate Registration' && (
              <Link
                to={{ pathname: '/corporate-requests', tab: 'Pending', search: '?type=corporate' }}
                className="col text-warning font-weight-bold font-size-h6"
              >
                <div className="bg-light-warning px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                    <h2 className="text-warning">{countData.pending ? countData.pending + externalCount.pending : 0}</h2>
                  </span>
                  Pending
                </div>
              </Link>
            )}

            {type == 'Corporate Registration' && (
              <Link
                to={{ pathname: '/corporate-requests', tab: 'Approved', search: '?type=corporate' }}
                className="col text-success font-weight-bold font-size-h6 mt-2"
              >
                <div className="bg-light-success px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                    <h2 className="text-success">{countData.approved ? countData.approved + externalCount.approved : 0}</h2>
                  </span>
                  Approved
                </div>
              </Link>
            )}

            {type == 'Corporate Registration' && (
              <Link
                to={{ pathname: '/corporate-requests', tab: 'Returned', search: '?type=corporate' }}
                className="col text-danger font-weight-bold font-size-h6"
              >
                <div className="bg-light-danger px-6 py-8 rounded-xl ">
                  <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                    <h2 className="text-danger">{countData.returned ? countData.returned + externalCount.returned : 0}</h2>
                  </span>
                  Returned
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Resize */}
        {/* <div className="resize-triggers">
          <div className="expand-trigger">
            <div style={{ width: '411px', height: '461px' }} />
          </div>
          <div className="contract-trigger" />
        </div> */}
      </div>
    </div>
  );
}

function getChartOptions(layoutProps) {
  const strokeColor = '#D13647';

  const options = {
    series: [
      {
        name: 'Request Frequency',
        data: [10, 20, 30, 40, 10, 60, 10]
      }
    ],
    chart: {
      type: 'area',
      height: 200,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      sparkline: {
        enabled: true
      },
      dropShadow: {
        enabled: true,
        enabledOnSeries: undefined,
        top: 5,
        left: 0,
        blur: 3,
        color: strokeColor,
        opacity: 0.5
      }
    },
    plotOptions: {},
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      type: 'solid',
      opacity: 0
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [strokeColor]
    },
    xaxis: {
      categories: ['12 AM', '1 AM', '2 AM', '3 AM', '4 AM', '5 AM', '6 AM'],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: '12px',
          fontFamily: layoutProps.fontFamily
        }
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: layoutProps.colorsGrayGray300,
          width: 1,
          dashArray: 3
        }
      }
    },
    yaxis: {
      min: 0,
      max: 80,
      labels: {
        show: false,
        style: {
          colors: layoutProps.colorsGrayGray500,
          fontSize: '12px',
          fontFamily: layoutProps.fontFamily
        }
      }
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      hover: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0
        }
      }
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: layoutProps.fontFamily
      },
      y: {
        formatter: function(val) {
          return val;
        }
      },
      marker: {
        show: false
      }
    },
    colors: ['transparent'],
    markers: {
      colors: layoutProps.colorsThemeBaseDanger,
      strokeColor: [strokeColor],
      strokeWidth: 3
    }
  };
  return options;
}
