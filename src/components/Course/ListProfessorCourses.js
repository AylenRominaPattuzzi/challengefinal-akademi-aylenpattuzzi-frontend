import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoursesByProfessor, deleteCourse } from '../../redux/actions/courseActions';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../common/CardCourse';

const ListProfessorCourses = ({ courses, getCoursesByProfessor, deleteCourse, loading, error }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getCoursesByProfessor();
  }, [getCoursesByProfessor]);

  const handleViewCourse = (id) => {
    navigate(`/course-detail/${id}`);
  };

  const handleDeleteCourse = (course) => {
    if (window.confirm(`¿Estás seguro de que querés eliminar el curso "${course.title}"?`)) {
      deleteCourse(course._id);
    }
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
    return <div className="ui message info">No hay cursos disponibles.</div>;
  }

  return (
    <div className="ui container" style={{ paddingTop: '2rem' }}>
      <h2 className="ui header">Cursos</h2>
      <div className="ui three stackable cards">
        {courses.map((course) => (
          <CardCourse 
            key={course._id} 
            course={course} 
            onView={handleViewCourse} 
            onDelete={handleDeleteCourse} 
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.course.courses,
  loading: state.course.operations.fetchCoursesByProfessor.loading,
  error: state.course.operations.fetchCoursesByProfessor.error,
});

const mapDispatchToProps = {
  getCoursesByProfessor,
  deleteCourse
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProfessorCourses);
