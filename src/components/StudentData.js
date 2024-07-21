import React, { useContext, useState } from "react";
import { StudentContext } from "../context/StudentContext";
import { NavLink } from "react-router-dom";
import {
  Table,
  Button,
  Form,
  Row,
  Col,
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { Filter } from "react-bootstrap-icons";
import { saveAs } from "file-saver";

const StudentData = () => {
  const { students, deleteStudent } = useContext(StudentContext);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(5);
  const [pageRange] = useState(5);

  const handleCheckboxChange = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  const handleBulkDelete = () => {
    selectedStudents.forEach((id) => deleteStudent(id));
    setSelectedStudents([]);
  };

  const handleSendInvoice = (id) => {
    const student = students.find((s) => s.id === id);
    if (student && student.paymentStatus === "Unpaid") {
      const invoiceContent = `
        Invoice for ${student.name}
        Roll Number: ${student.rollNumber}
        Fees: ${student.fees}
        Payment Status: ${student.paymentStatus}
        Thank you for your attention.
      `;
      const blob = new Blob([invoiceContent], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, `${student.rollNumber}_invoice.txt`);
    } else {
      alert("No invoice needed for this student.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (criteria) => {
    setFilterCriteria(criteria);
  };

  const filteredStudents = students.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const finalStudents = filterCriteria
    ? filteredStudents.filter(
        (student) => student.paymentStatus === filterCriteria
      )
    : filteredStudents;

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = finalStudents.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(finalStudents.length / studentsPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  // Determine the range of pages to display
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filterPopover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Filter by Payment Status</Popover.Header>
      <Popover.Body>
        <Form.Check
          type="radio"
          label="All"
          name="filterCriteria"
          checked={filterCriteria === ""}
          onChange={() => handleFilterChange("")}
        />
        <Form.Check
          type="radio"
          label="Paid"
          name="filterCriteria"
          checked={filterCriteria === "Paid"}
          onChange={() => handleFilterChange("Paid")}
        />
        <Form.Check
          type="radio"
          label="Unpaid"
          name="filterCriteria"
          checked={filterCriteria === "Unpaid"}
          onChange={() => handleFilterChange("Unpaid")}
        />
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="container mt-3">
      <h2>Student List</h2>
      <Row className="mb-3 align-items-center">
        <Col md={12} lg={6} className="mb-2 mb-lg-0">
          <Form.Control
            type="text"
            placeholder="Search by name or roll number"
            value={searchQuery}
            onChange={handleSearch}
          />
        </Col>
        <Col
          md={12}
          lg={6}
          className="d-flex flex-column flex-md-row justify-content-md-between"
        >
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={filterPopover}
          >
            <Button variant="secondary" className="mb-2 mb-md-0">
              <Filter /> Filter
            </Button>
          </OverlayTrigger>
          <div className="d-flex">
            <NavLink to="/dashboard/students/create">
              <Button variant="primary" className="me-2">
                Add New Student
              </Button>
            </NavLink>
            <Button
              variant="danger"
              onClick={handleBulkDelete}
              disabled={selectedStudents.length === 0}
            >
              Bulk Delete
            </Button>
          </div>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  checked={selectedStudents.length === finalStudents.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedStudents(
                        finalStudents.map((student) => student.id)
                      );
                    } else {
                      setSelectedStudents([]);
                    }
                  }}
                />
              </th>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Fees</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student) => (
              <tr key={student.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleCheckboxChange(student.id)}
                  />
                </td>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>{student.fees}</td>
                <td>{student.paymentStatus}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleSendInvoice(student.id)}
                  >
                    Send Invoice
                  </Button>
                  <NavLink to={`/dashboard/students/edit/${student.id}`}>
                    <Button variant="warning" size="sm" className="ms-2">
                      Edit
                    </Button>
                  </NavLink>
                  <NavLink to={`/dashboard/students/detail/${student.id}`}>
                    <Button variant="success" size="sm" className="ms-2">
                      View
                    </Button>
                  </NavLink>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteStudent(student.id)}
                    className="ms-2"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <Button
              className="page-link"
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &laquo; Previous
            </Button>
          </li>
          {startPage > 1 && (
            <>
              <li className="page-item">
                <Button className="page-link" onClick={() => paginate(1)}>
                  1
                </Button>
              </li>
              {startPage > 2 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
            </>
          )}
          {visiblePageNumbers.map((number) => (
            <li
              key={number}
              className={`page-item ${currentPage === number ? "active" : ""}`}
            >
              <Button className="page-link" onClick={() => paginate(number)}>
                {number}
              </Button>
            </li>
          ))}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              <li className="page-item">
                <Button
                  className="page-link"
                  onClick={() => paginate(totalPages)}
                >
                  {totalPages}
                </Button>
              </li>
            </>
          )}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <Button
              className="page-link"
              onClick={() =>
                currentPage < totalPages && paginate(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            >
              Next &raquo;
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentData;
