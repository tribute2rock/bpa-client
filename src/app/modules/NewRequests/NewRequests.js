import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, CardHeaderToolbar } from '../../../_metronic/_partials/controls';
import WorkflowFilterPanel from '../Workflow/pages/workflow/WorkflowFilterPanel';
import SearchBox from '../../components/searchBox';
import { availableCategory } from './api/newrequest';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import A from '../../../config/url';
import metaRoutes from '../../../config/meta_routes';

export default function NewRequests(props) {
  const [categoryList, setCategoryList] = useState([]);

  const updateData = () => {
    availableCategory((err, data) => {
      if (err) {
        toast.error(err.response.data.message ?? 'Error while fetching categories.');
      } else {
        setCategoryList(data.data[0]);
      }
    });
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <Card>
      <WorkflowFilterPanel />
      <CardHeader title="Categories">
        <CardHeaderToolbar>{/* <SearchBox searchInput="" /> */}</CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <div className="content-section">
          <div className="row">
            {categoryList.map((category, index) =>
              category.isActive ? (
                <div className="col-md-2" key={index}>
                  <div className="each-content text-center rounded mb-8 text-secondary">
                    <Link
                      to={{
                        pathname: metaRoutes.formLists,
                        search: '?i=' + A.getHash(category.id),
                        state: { fromHome: '?i=' + A.getHash(category.id) }
                      }}
                      className="content-item"
                    >
                      <h5>{category.name}</h5>
                    </Link>
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
