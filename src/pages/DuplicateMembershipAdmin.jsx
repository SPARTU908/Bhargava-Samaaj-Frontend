import React, {
  useEffect,
  useState,
} from "react";

import {
  getAllDuplicateApplications,
} from "../apis/duplicateMembership";

import "./DuplicateMembershipAdmin.css";


const DuplicateMembershipAdmin = () => {

  const [
    applications,
    setApplications,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {
    fetchApplications();
  }, []);


  const fetchApplications =
    async () => {

      try {
        setLoading(true);
        setError("");

        const response =
          await getAllDuplicateApplications();

        if (response.success) {
          setApplications(
            response.data || []
          );
        } else {
          setError(
            response.message ||
              "Failed to fetch applications"
          );
        }

      } catch (error) {

        console.error(
          "Duplicate applications fetch error:",
          error
        );

        setError(
          error?.message ||
            "Failed to fetch duplicate applications"
        );

      } finally {
        setLoading(false);
      }
    };


  if (loading) {
    return (
      <div className="duplicate-admin-loading">
        Loading duplicate applications...
      </div>
    );
  }


  if (error) {
    return (
      <div className="duplicate-admin-error">
        {error}
      </div>
    );
  }


  return (
    <div className="duplicate-admin-page">

      <div className="duplicate-admin-header">

        <div>
          <h2>
            Duplicate Membership Applications
          </h2>

          <p>
            Total Applications:{" "}
            <strong>
              {applications.length}
            </strong>
          </p>
        </div>

        <button
          type="button"
          onClick={
            fetchApplications
          }
          className="duplicate-refresh-btn"
        >
          Refresh
        </button>

      </div>


      {applications.length === 0 ? (

        <div className="duplicate-empty">
          No duplicate membership applications found.
        </div>

      ) : (

        <div className="duplicate-table-wrapper">

          <table className="duplicate-admin-table">

            <thead>
              <tr>
                <th>#</th>

                <th>Name</th>

                <th>ABBS LM No</th>

                <th>Mobile</th>

                <th>Email</th>

                <th>DOB</th>

                <th>S/o D/o W/o</th>

                <th>Occupation</th>

                <th>Gotra</th>

                <th>Kuldevi</th>

                <th>Old Address</th>

                <th>New Address</th>

                <th>Pin Code</th>

                <th>Photo</th>

                <th>Aadhaar</th>

                <th>Signature</th>

                <th>Spouse Name</th>

                <th>Spouse LM No</th>

                <th>Spouse Mobile</th>

                <th>Spouse Email</th>

                <th>Spouse DOB</th>

                <th>Spouse Occupation</th>

                <th>Spouse Relation</th>

                <th>Spouse Photo</th>

                <th>Spouse Aadhaar</th>

                <th>Spouse Signature</th>

                <th>Total Amount</th>

                <th>Transaction ID</th>

                <th>Payment Screenshot</th>

                <th>Payment Status</th>

                <th>Application Status</th>

                <th>Created At</th>
              </tr>
            </thead>


            <tbody>

              {applications.map(
                (item, index) => (

                  <tr key={item._id}>

                    <td>
                      {index + 1}
                    </td>


                    <td>
                      <strong>
                        {item.name || "-"}
                      </strong>
                    </td>


                    <td>
                      {item.abbsLmNo || "-"}
                    </td>


                    <td>
                      {item.mobile || "-"}
                    </td>


                    <td>
                      {item.email || "-"}
                    </td>


                    <td>
                      {item.dob
                        ? new Date(
                            item.dob
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"}
                    </td>


                    <td>
                      {item.relationName ||
                        "-"}
                    </td>


                    <td>
                      {item.occupation ||
                        "-"}
                    </td>


                    <td>
                      {item.gotra || "-"}
                    </td>


                    <td>
                      {item.kuldevi ||
                        "-"}
                    </td>


                    <td className="address-cell">
                      {item.oldAddress ||
                        "-"}
                    </td>


                    <td className="address-cell">
                      {item.newAddress ||
                        "-"}
                    </td>


                    <td>
                      {item.pincode ||
                        "-"}
                    </td>


                    <td>
                      <FileLink
                        url={item.photo}
                        label="View Photo"
                      />
                    </td>


                    <td>
                      <FileLink
                        url={
                          item.aadharCard
                        }
                        label="View Aadhaar"
                      />
                    </td>


                    <td>
                      <FileLink
                        url={
                          item.signature
                        }
                        label="View Signature"
                      />
                    </td>


                    <td>
                      {item.spouse?.name ||
                        "-"}
                    </td>


                    <td>
                      {item.spouse
                        ?.abbsLmNo || "-"}
                    </td>


                    <td>
                      {item.spouse
                        ?.mobile || "-"}
                    </td>


                    <td>
                      {item.spouse
                        ?.email || "-"}
                    </td>


                    <td>
                      {item.spouse?.dob
                        ? new Date(
                            item.spouse.dob
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"}
                    </td>


                    <td>
                      {item.spouse
                        ?.occupation || "-"}
                    </td>


                    <td>
                      {item.spouse
                        ?.relationName || "-"}
                    </td>


                    <td>
                      <FileLink
                        url={
                          item.spouse?.photo
                        }
                        label="View Photo"
                      />
                    </td>


                    <td>
                      <FileLink
                        url={
                          item.spouse
                            ?.aadharCard
                        }
                        label="View Aadhaar"
                      />
                    </td>


                    <td>
                      <FileLink
                        url={
                          item.spouse
                            ?.signature
                        }
                        label="View Signature"
                      />
                    </td>


                    <td>
                      ₹
                      {item.totalAmount ??
                        50}
                    </td>


                    <td>
                      {item.transactionId ||
                        "-"}
                    </td>


                    <td>
                      <FileLink
                        url={
                          item.paymentScreenshot
                        }
                        label="View Payment"
                      />
                    </td>


                    <td>
                      <StatusBadge
                        value={
                          item.paymentStatus
                        }
                      />
                    </td>


                    <td>
                      <StatusBadge
                        value={
                          item.applicationStatus
                        }
                      />
                    </td>


                    <td>
                      {item.createdAt
                        ? new Date(
                            item.createdAt
                          ).toLocaleString(
                            "en-IN"
                          )
                        : "-"}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};


const FileLink = ({
  url,
  label,
}) => {

  if (!url) {
    return <span>-</span>;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="duplicate-file-link"
    >
      {label}
    </a>
  );
};


const StatusBadge = ({
  value,
}) => {

  const status =
    value || "pending";

  return (
    <span
      className={`duplicate-status duplicate-status-${status}`}
    >
      {status
        .replaceAll("_", " ")
        .toUpperCase()}
    </span>
  );
};


export default DuplicateMembershipAdmin;