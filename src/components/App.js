import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './User/Login';
import ForgotPassword from './User/ForgotPassword';
import ResetPassword from './User/ResetPassword';
import RegisterUser from './User/RegisterUser';
import Dashboard from './Dashboard';
import ListUsers from './User/ListUsers';
import UserDetail from './User/UserDetail';
import Nadvar from './common/Nadvar';
import RegisterProfessor from './User/RegisterProfessor';
import CreateCourse from './Course/CreateCourse';
import ListProfessorCourses from './Course/ListProfessorCourses';
import CourseDetail from './Course/CourseDetail';
import ListCourses from './Course/ListCourses';
import ListGrades from './Grades/ListGrades';
import ListStudentCourses from './Course/ListStudentCourses';
import ListStudentGrades from './Grades/ListStudentGrades';



const App = () => {

  return (
    <div className="ui container">
      <Nadvar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<RegisterUser />} />

        <Route path="/list-users" element={<ListUsers />} />
        <Route path="/user-detail/:id" element={<UserDetail />} />
        <Route path="/create-professor" element={<RegisterProfessor />} />

        <Route path="/professor/create-course" element={<CreateCourse />} />
        <Route path="/professor/my-courses" element={<ListProfessorCourses />} />
        <Route path="/curse-detail/:id" element={<CourseDetail />} />
        <Route path="/list-courses" element={<ListCourses />} />

        <Route path="/professor/grades" element={<ListGrades />} />

        <Route path="/student/my-courses" element={<ListStudentCourses />} />
        <Route path="/student/my-grades" element={<ListStudentGrades />} />
  
      </Routes>
    </div>
  );
};

export default App;
