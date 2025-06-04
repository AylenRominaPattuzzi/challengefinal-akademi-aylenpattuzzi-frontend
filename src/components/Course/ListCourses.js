import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCoursesByProfessor } from '../../redux/actions/courseActions';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course, onView }) => (
  <div className="ui card">
    <div className="content">
      <div className="header">{course.title}</div>
      <div className="meta">{new Date(course.createdAt).toLocaleDateString()}</div>
      <div className="description">{course.description}</div>
      <div className="extra">
        <button className="ui mini button" onClick={() => onView(course.id)}>Ver</button>
      </div>
    </div>
  </div>
);

const ListCourse = ({ courses, getCoursesByProfessor, loading, error }) => {
  const navigate = useNavigate();

  useEffect(() => {
      getCoursesByProfessor();
  }, [getCoursesByProfessor]);

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

  console.log(courses);
  

  if (!courses || courses.length === 0) {
    return <div className="ui message info">No hay cursos disponibles.</div>;
  }

  return (
    <div className="ui container" style={{ paddingTop: '2rem' }}>
      <h2 className="ui header">Cursos del Profesor</h2>
      <div className="ui three stackable cards">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onView={handleViewCourse} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.course.courses,
  loading: state.course.loading,
  error: state.course.error,
});

const mapDispatchToProps = {
  getCoursesByProfessor,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCourse);
