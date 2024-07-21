// src/components/ViewStudent.js
import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { StudentContext } from "../context/StudentContext";
import { Button } from "react-bootstrap";

const StudentDetail = () => {
  const { id } = useParams();
  const { students } = useContext(StudentContext);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = () => {
      const foundStudent = students.find((s) => s.id === id);
      setStudent(foundStudent);
    };
    fetchStudent();
  }, [id, students]);

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-3">
      <h2>Student Details</h2>
      <div>
        <strong>Name:</strong> {student.name}
      </div>
      <div>
        <strong>Roll Number:</strong> {student.rollNumber}
      </div>
      <div>
        <strong>Fees:</strong> {student.fees}
      </div>
      <div>
        <strong>Payment Status:</strong> {student.paymentStatus}
      </div>
      <NavLink to="/dashboard/students">
        <Button variant="secondary" className="mt-3">
          Back to List
        </Button>
      </NavLink>
    </div>
  );
};

export default StudentDetail;
