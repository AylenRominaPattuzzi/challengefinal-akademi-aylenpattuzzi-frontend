import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoursesByProfessor } from '../../redux/actions/courseActions';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../common/CardCourse'; 

const ListCourse = ({ courses, getCoursesByProfessor, loading, error }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getCoursesByProfessor();
  }, [getCoursesByProfessor]);

  const handleViewCourse = (id) => {
    navigate(`/course-detail/${id}`);
  };

  const handleDeleteCourse = (course) => {
    // Aquí iría la lógica para eliminar el curso
    console.log('Eliminar curso:', course);
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
            key={course.id || course._id} 
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
  courses: state.course.professorCourses,
  loading: state.course.loadingProfessorCourses,
  error: state.course.errorProfessorCourses,
});

const mapDispatchToProps = {
  getCoursesByProfessor,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCourse);
