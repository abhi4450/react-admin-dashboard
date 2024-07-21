
import React, { useState, useContext } from "react";
import { StudentContext } from "../context/StudentContext";
import { useNavigate,NavLink } from "react-router-dom";
import { Form, Button } from "react-bootstrap";


const CreateStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    rollNumber: "",
    fees: "",
    paymentStatus: "Unpaid",
  });
  const { addStudent } = useContext(StudentContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addStudent(student);
    navigate("/dashboard/students");
  };

  return (
    <div className="container mt-3">
      <h2>Create New Student</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formRollNumber">
          <Form.Label>Roll Number</Form.Label>
          <Form.Control
            type="text"
            name="rollNumber"
            value={student.rollNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formFees">
          <Form.Label>Fees</Form.Label>
          <Form.Control
            type="number"
            name="fees"
            value={student.fees}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPaymentStatus">
          <Form.Label>Payment Status</Form.Label>
          <Form.Control
            as="select"
            name="paymentStatus"
            value={student.paymentStatus}
            onChange={handleChange}
          >
            <option>Paid</option>
            <option>Unpaid</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Student
        </Button>
        <NavLink to="/dashboard/students">
          <Button variant="secondary" className="mt-3 ms-2">
            Back to List
          </Button>
        </NavLink>
      </Form>
    </div>
  );
};

export default CreateStudent;
