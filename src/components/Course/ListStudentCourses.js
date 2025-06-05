import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoursesByStudent } from '../../redux/actions/courseActions'; 
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../common/CardCourse';

const ListStudentCourses = ({ courses, getCoursesByStudent, loading, error }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getCoursesByStudent();
  }, [getCoursesByStudent]);

  const handleViewCourse = (id) => {
    navigate(`/course-detail/${id}`);
  };

  if (loading) {
    return <div className="ui active centered inline loader" />;
  }

  if (error) {
    return (
      <div className="ui negative message">
        <div className="header">Error al obtener cursos</div>
        <p>{error}</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return <div className="ui message info">No estás inscripto en ningún curso.</div>;
  }

  return (
    <div className="ui container" style={{ paddingTop: '2rem' }}>
      <h2 className="ui header">Mis cursos</h2>
      <div className="ui three stackable cards">
        {courses.map((course) => (
          <CardCourse 
            key={course._id} 
            course={course} 
            onView={handleViewCourse} 
            // No onDelete porque alumno no puede borrar
            // Tampoco boton de inscripcion (por defecto en CardCourse podés controlar esto con props)
            isEnrolled={true} // Para que muestre botón "Inscripto" si usas ese prop
            onEnroll={null}   // No se necesita botón inscribirse aquí
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.course.courses,
  loading: state.course.operations.fetchCoursesByStudent?.loading,
  error: state.course.operations.fetchCoursesByStudent?.error,
});

const mapDispatchToProps = {
  getCoursesByStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStudentCourses);
