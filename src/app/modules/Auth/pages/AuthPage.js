/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, Switch, Redirect } from 'react-router-dom';
import { toAbsoluteUrl } from '../../../../_metronic/_helpers';
import { ContentRoute } from '../../../../_metronic/layout';
import Login from './Login';
import '../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss';
import themeData from '../../../../config/theme';

export function AuthPage() {
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
          id="kt_login"
        >
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={{
              backgroundImage: `url(${toAbsoluteUrl('/media/bg/bg-4.jpg')})`
            }}
          >
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              <Link to="/" className="flex-column-auto mt-5 pb-lg-0 pb-10">
                <img
                  alt="Logo"
                  className="max-h-60px bg-white pl-5 pr-5 rounded"
                  src={toAbsoluteUrl('/media/logos/GenTechLogo.png')}
                />
              </Link>

              {/* end:: Aside header */}

              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                <Link to="/" className="mt-5">
                  <img
                    alt="Logo"
                    className="max-h-70px mb-3 bg-white pt-5 pb-5 pl-3 pr-4 rounded"
                    src={toAbsoluteUrl('/media/logos/logo.png')}
                  />
                </Link>
                <h3 className="font-size-h1 mb-5 text-white">Welcome to BPA</h3>
                <p className="font-weight-lighter text-white opacity-80">
                  <b>Business Process Automation</b> <br />
                  Customer Onboarding & Workflow Management System
                </p>
              </div>
              {/* end:: Aside content */}

              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">&copy; 2021 General Technology</div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}

          {/*begin::Content*/}
          <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
            {/* begin::Content body */}
            <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
              <Switch>
                <ContentRoute path="/auth/login" component={Login} />
                {/*<ContentRoute path="/auth/forgot-password" component={ForgotPassword} />*/}
                <Redirect from="/auth" exact={true} to="/auth/login" />
                <Redirect to="/auth/login" />
              </Switch>
            </div>
            {/*end::Content body*/}

            {/* begin::Mobile footer */}
            <div className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">&copy; 2021 General Technology</div>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
