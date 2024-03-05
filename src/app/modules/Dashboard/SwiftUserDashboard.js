import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { server } from '../../../config/server';
const getRequests = (data, callback) => {
  server
    .get(`/requests?pageSize=10000`, { params: data })
    .then(res => {
      // console.log(res.data);
      return res.data;
    })
    .then(data => {
      callback(null, data.data);
    })
    .catch(err => {
      callback(err);
    });
};
const SwiftUserDashboard = ({ className }) => {
  const [count, setCount] = useState([]);
  useEffect(() => {
    getRequests({}, (err, data) => {
      if (!err) {
        setCount(data.pageData);
      }
    });
  }, []);
  return (
    <div className={`card card-custom bg-gray-100 ${className}`} style={{ 'box-shadow': 'none' }}>
      {/* Header */}
      <div className="card-header border-0 bg-danger py-5">
        <h3 className="card-title font-weight-bolder text-white">Requests Count</h3>
      </div>
      {/* Body */}
      <div className="card-body p-0 position-relative overflow-hidden" style={{ background: '#eef0f8' }}>
        {/* Chart */}
        <div id="kt_mixed_widget_1_chart" className="card-rounded-bottom bg-danger" style={{ height: '200px' }}></div>

        {/* Stat */}
        <div className="card-spacer mt-n25">
          <div className="row m-0">
            <div className="col bg-light-secondary px-6 py-8 rounded-xl mr-7 mb-7">
              <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                <h2 className="text-secondary">{count.length || 0}</h2>
              </span>
              <Link to={{ pathname: '/requests', tab: 'All' }} className="text-secondary font-weight-bold font-size-h6">
                Total Requests
              </Link>
            </div>
            <div className="col bg-light-primary px-6 py-8 rounded-xl mr-7 mb-7">
              <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                <h2 className="text-primary">{count?.filter(list => list.swiftUpload == true).length || 0}</h2>
              </span>
              <Link
                to={{ pathname: '/requests', tab: 'transmitted' }}
                className="text-primary font-weight-bold font-size-h6 mt-2"
              >
                Transmitted Requests
              </Link>
            </div>
            <div className="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
              <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                <h2 className="text-warning">
                  {count?.filter(list => list.swiftUpload != true && list.swiftClosed != true).length || 0}
                </h2>
              </span>
              <Link
                to={{ pathname: '/requests', tab: 'notTransmitted' }}
                className="text-warning font-weight-bold font-size-h6"
              >
                Not Transmitted Requests
              </Link>
            </div>
            <div className="col bg-light-warning px-6 py-8 rounded-xl mr-7 mb-7">
              <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                <h2 className="text-warning">{count?.filter(list => list.swiftClosed == true).length || 0}</h2>
              </span>
              <Link to={{ pathname: '/requests', tab: 'closed' }} className="text-warning font-weight-bold font-size-h6">
                Closed And Not Transmitted
              </Link>
            </div>
          </div>
        </div>

        {/* Resize */}
        <div className="resize-triggers">
          <div className="expand-trigger">
            <div style={{ width: '411px', height: '461px' }} />
          </div>
          <div className="contract-trigger" />
        </div>
      </div>
    </div>
  );
};

export default SwiftUserDashboard;
