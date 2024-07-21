
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/students");
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const addStudent = async (student) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/students",
        student
      );
      setStudents((prevStudents) => [...prevStudents, response.data]);
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const updateStudent = async (updatedStudent) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/students/${updatedStudent.id}`,
        updatedStudent
      );
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === updatedStudent.id ? response.data : student
        )
      );
    } catch (error) {
      console.error(
        "Error updating student:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/students/${id}`);
      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error(
        "Error deleting student:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <StudentContext.Provider
      value={{ students, addStudent, updateStudent, deleteStudent }}
    >
      {children}
    </StudentContext.Provider>
  );
};
