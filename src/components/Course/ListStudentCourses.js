import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCoursesByStudent } from '../../redux/actions/courseActions';
import { cancelEnrollment } from '../../redux/actions/enrollmentActions';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../common/CardCourse';
import Modal from '../common/Modal';
import Pagination from '../common/Pagination';

const ListStudentCourses = ({
  courses,
  getCoursesByStudent,
  cancelEnrollment,
  loading,
  error,
  totalPages = 1,
  currentPage
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(currentPage || 1);

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    getCoursesByStudent({ search, category, page });
  }, [search, category, page]);

  const handleViewCourse = (id) => {
    navigate(`/course-detail/${id}`);
  };

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCancelEnrollment = async () => {
    if (selectedCourse?.enrollmentId) {
      await cancelEnrollment(selectedCourse.enrollmentId);
      await getCoursesByStudent({ search, category, page });
    }
    setShowModal(false);
    setSelectedCourse(null);
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
      <h2 className="ui header">Mis cursos</h2>

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
              <option value="backend">BACKEND</option>
              <option value="frontend">FRONTEND</option>
            </select>
          </div>
        </div>
      </div>
      {loading}
      {(!courses || courses.length === 0) ? (
        <div className="ui message info">No estás inscripto en ningún curso.</div>
      ) : (
        <>
          <div className="ui three stackable cards">
            {courses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                onView={handleViewCourse}
                isEnrolled={true}
                onUnenroll={() => handleOpenModal(course)}
                hideDetailButton={true}
              />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </>
      )}

      {showModal && selectedCourse && (
        <Modal
          productName={selectedCourse.title}
          modalTitle="¿Desinscribirse del curso?"
          modalDescription="¿Estás seguro de que deseas desinscribirte del curso?"
          onCancel={() => setShowModal(false)}
          onConfirm={handleCancelEnrollment}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.course.courses,
  totalPages: state.course.totalPages,
  currentPage: state.course.currentPage,
  loading: state.course.operations.fetchCoursesByStudent?.loading,
  error: state.course.operations.fetchCoursesByStudent?.error,
});

const mapDispatchToProps = {
  getCoursesByStudent,
  cancelEnrollment,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStudentCourses);
