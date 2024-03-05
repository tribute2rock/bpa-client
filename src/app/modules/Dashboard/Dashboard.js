import React, { useEffect, useState } from 'react';
import { MixedWidget1 } from '../../../_metronic/_partials/widgets';
import {
  getRequestsCount,
  getInternalCount,
  getCorporateInternalCount,
  getCorporateExternalCount
} from '../Requests/pages/requests/api';
import { toast } from 'react-toastify';
import SwiftUserDashboard from './SwiftUserDashboard';
import { useSelector } from 'react-redux';
export function Dashboard() {
  const [requestCount, setRequestCount] = useState({});
  const [internalRequestCount, setInternalRequestCount] = useState({});

  const [corporateInternalCount, setCorporateInternalCount] = useState({});
  const [corporateExternalCount, setCorporateExternalCount] = useState({});

  const userData = useSelector(state => state.user);
  const userInfo = useSelector(state => state.user?.data.user);

  useEffect(() => {
    if (userData) {
      countRequests();
      countInternalRequests();
      countCorporateInternalRequests();
      countCorporateExternalRequests();
    }
  }, []);

  const countRequests = () => {
    getRequestsCount((err, data) => {
      if (!err) {
        setRequestCount(data);
      }
    });
  };
  const countInternalRequests = () => {
    getInternalCount((err, data) => {
      if (!err) {
        setInternalRequestCount(data);
      }
    });
  };

  const countCorporateInternalRequests = () => {
    getCorporateInternalCount((err, data) => {
      if (!err) {
        setCorporateInternalCount(data);
      }
    });
  };

  const countCorporateExternalRequests = () => {
    getCorporateExternalCount((err, data) => {
      if (!err) {
        setCorporateExternalCount(data);
      }
    });
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          {userData.data.user.roleId == 3 ? (
            <SwiftUserDashboard className="card-stretch gutter-b" />
          ) : (
            <>
              <MixedWidget1 className="card-stretch gutter-b" type="Internal" countData={internalRequestCount} />
              <MixedWidget1 className="card-stretch gutter-b" type="Customer" countData={requestCount} />
              {userInfo.roleId !== 1 && (
                <MixedWidget1
                  className="card-stretch gutter-b"
                  type="Corporate Registration"
                  countData={corporateInternalCount}
                  externalCount={corporateExternalCount}
                />
              )}
              {/* <MixedWidget1 className="card-stretch gutter-b" type="Corporate External" countData={corporateExternalCount} /> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
