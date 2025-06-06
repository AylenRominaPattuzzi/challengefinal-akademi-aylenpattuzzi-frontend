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
import ListStudentCourses from './Course/ListStudentCourses';
import ListStudentGrades from './Grades/ListStudentGrades';
import ListProfessorGrades from './Grades/ListProfessorGrades';
import { WithProtectedRoute } from '../utils/WithProtectedRoute';
import { ToastContainer } from 'react-toastify';

const App = () => {

  return (
    <div className="ui container">
      <Nadvar />
      <ToastContainer />
      <Routes>

        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/register" element={<RegisterUser />} />

        <Route path="/dashboard" element={
          <WithProtectedRoute
            roles={['superadmin']}
            component={<Dashboard />}
          />} />
          
        <Route path="/list-users" element={
          <WithProtectedRoute
            roles={['superadmin']}
            component={<ListUsers />}
          />} />
        <Route path="/user-detail/:id" element={
          <WithProtectedRoute
            roles={['superadmin']}
            component={<UserDetail />}
          />} />

        <Route path="/create-professor" element={
          <WithProtectedRoute
            roles={['superadmin']}
            component={<RegisterProfessor />}
          />} />

        <Route path="/professor/create-course" element={
          <WithProtectedRoute
            roles={['professor']}
            component={<CreateCourse />}
          />} />

        <Route path="/professor/my-courses" element={
          <WithProtectedRoute
            roles={['professor']}
            component={<ListProfessorCourses />}
          />} />

        <Route path="/professor/grades/:id" element={
          <WithProtectedRoute
            roles={['professor']}
            component={<ListProfessorGrades />}
          />} />

        <Route path="/course-detail/:id" element={
          <WithProtectedRoute
            roles={['professor', 'superadmin']}
            component={<CourseDetail />}
          />} />

        <Route path="/list-courses" element={
          <WithProtectedRoute
            roles={['student', 'superadmin', 'professor']}
            component={<ListCourses />}
          />} />

        <Route path="/student/list-courses" element={
          <WithProtectedRoute
            roles={['student']}
            component={<ListCourses />}
          />} />
        <Route path="/student/my-courses" element={
          <WithProtectedRoute
            roles={['student']}
            component={<ListStudentCourses />}
          />} />

        <Route path="/student/my-grades" element={
          <WithProtectedRoute
            roles={['student']}
            component={<ListStudentGrades />}
          />} />
      </Routes>
    </div>
  );
};

export default App;
