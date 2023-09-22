import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const CreateReport = () => {
  return (
    <Layout title={"Dashboard - Download Report"}>
      <div className="container-fluid m-3 p-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Download Report</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateReport;
