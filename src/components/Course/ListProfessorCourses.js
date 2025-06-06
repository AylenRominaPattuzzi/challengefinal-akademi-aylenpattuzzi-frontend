import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCoursesByProfessor, deleteCourse } from '../../redux/actions/courseActions';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../common/CardCourse';
import Modal from '../common/Modal';
import Loading from '../common/Loading';
const ListProfessorCourses = ({
  courses,
  getCoursesByProfessor,
  deleteCourse,
  loading,
  error,
  totalPages = 1,
  currentPage,
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(currentPage || 1);

  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    getCoursesByProfessor({ search, category, page });
  }, [search, category, page]);

  const handleViewCourse = (id) => {
    navigate(`/professor/grades/${id}`);
  };

  const handleEditCourse = (id) => {
    navigate(`/course-detail/${id}`);
  };

  const handleDeleteCourse = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (selectedCourse) {
      deleteCourse(selectedCourse._id);
      setSelectedCourse(null);
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setSelectedCourse(null);
    setShowModal(false);
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
      <h2 className="ui header">Mis Cursos</h2>

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
      {loading }
      {(!courses || courses.length === 0) ? (
        <div className="ui message info">No hay cursos disponibles.</div>
      ) : (
        <>
          <div className="ui three stackable cards">
            {courses.map((course) => (
              <CardCourse
                key={course._id}
                course={course}
                onView={handleViewCourse}
                onEdit={handleEditCourse}
                onDelete={() => handleDeleteCourse(course)}
                hideEnrollButton={true}
              />
            ))}
          </div>
          {totalPages > 1 && renderPagination()}
        </>
      )}

      {/* Modal de Confirmación */}
      {showModal && selectedCourse && (
        <Modal
          productName={selectedCourse.title}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          modalTitle="Confirmar eliminación"
          modalDescription="¿Estás seguro que querés eliminar el curso"
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.course.courses,
  totalPages: state.course.totalPages,
  currentPage: state.course.currentPage,
  loading: state.course.operations.fetchCoursesByProfessor.loading,
  error: state.course.operations.fetchCoursesByProfessor.error,
});

const mapDispatchToProps = {
  getCoursesByProfessor,
  deleteCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProfessorCourses);
