import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';

const Navbar = ({ role, logoutUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  if (!role) return null;

  return (
    <div className="ui container">
      <div className="ui secondary pointing menu">
 

        {role === 'superadmin' && (
          <>
            <a className={`item ${isActive('/dashboard')}`} href="/dashboard">Página Principal</a>
            <a className={`item ${isActive('/list-users')}`} href="/list-users">Usuarios</a>
            <a className={`item ${isActive('/create-professor')}`} href="/create-professor">Crear Profesor</a>
            <a className={`item ${isActive('/courses')}`} href="/courses">Cursos</a>
            <a className={`item ${isActive('/statistics')}`} href="/statistics">Estadísticas</a>
          </>
        )}

        {role === 'professor' && (
          <>
            <a className={`item ${isActive('/my-courses')}`} href="/my-courses">Mis Cursos</a>
            <a className={`item ${isActive('/create-course')}`} href="/create-course">Crear Curso</a>
            <a className={`item ${isActive('/grades')}`} href="/grades">Calificaciones</a>
          </>
        )}

        {role === 'student' && (
          <>
            <a className={`item ${isActive('/catalog')}`} href="/catalog">Catálogo</a>
            <a className={`item ${isActive('/my-courses')}`} href="/my-courses">Mis Cursos</a>
            <a className={`item ${isActive('/my-grades')}`} href="/my-grades">Mis Calificaciones</a>
          </>
        )}

        <div className="right menu">
          <div className="item">
            <button className="ui red button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
