import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCourses } from '../../redux/actions/courseActions';
import { enrollInCourse } from '../../redux/actions/enrollmentActions';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../common/CardCourse';


const ListCourses = ({
  courses,
  getCourses,
  enrollInCourse,
  enrollments,
  loading,
  error,
  studentId,
  role,
  totalPages = 1,
  currentPage
}) => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(currentPage || 1);

  useEffect(() => {
    getCourses({ search, category, page });
  }, [search, category, page]);

  const handleViewCourse = (id) => {
    navigate(`/course-detail/${id}`);
  };

  const handleEnroll = (courseId) => {
    const enrollmentData = { studentId, courseId };
    enrollInCourse(enrollmentData);
    navigate('/student/my-courses');
  };

  const isEnrolled = (courseId) => {
    return enrollments?.some((e) => e.courseId === courseId && e.studentId === studentId);
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="ui pagination menu">
        {pages.map((p) => (
          <button
            key={p}
            className={`item ${p === page ? 'active' : ''}`}
            onClick={() => setPage(p)}
          >
            {p}
          </button>
        ))}
      </div>
    );
  };

  if (error) {
    return (
      <div className="ui negative message">
        <div className="header">Error al obtener cursos</div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="ui container" style={{ paddingTop: '2rem' }}>
      <h2 className="ui header">Cursos</h2>

      <div className="ui form" style={{ marginBottom: '1rem' }}>
        <div className="fields">
          <div className="field">
            <input
              type="text"
              placeholder="Buscar curso..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
          <div className="field">
            <select
              className="ui dropdown"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Todas las categorías</option>
              <option value="backend">BRACKEND</option>
              <option value="frontend">FROTEND</option>
            </select>
          </div>
        </div>
      </div>
      {loading }
      {(!courses || courses.length === 0) ? (
        <div className="ui message info">No hay cursos disponibles.</div>
      ) : (
        <>
          <div className="ui three stackable cards">
            {courses?.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                onView={handleViewCourse}
                isEnrolled={isEnrolled(course._id)}
                onEnroll={() => handleEnroll(course._id)}
                hideEnrollButton={(role !== 'student')}
                hideDetailButton={(role === 'student')}
              />
            ))}
          </div>
          {totalPages > 1 && renderPagination()}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.course.courses,
  totalPages: state.course.totalPages,
  currentPage: state.course.currentPage,
  loading: state.course.operations.fetchCourses.loading,
  error: state.course.operations.fetchCourses.error,
  enrollments: state.enrollment.myEnrollments,
  studentId: state.auth.user?._id,
  role: state.auth.role,
});

const mapDispatchToProps = {
  getCourses,
  enrollInCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListCourses);
