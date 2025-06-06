import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchGradesByCourse, createGrade, updateGrade } from '../../redux/actions/gradeActions';
import { useParams } from 'react-router-dom';
import GradeModal from '../common/GradeModal';
import Modal from '../common/Modal';
import { toast } from 'react-toastify';


const ListProfessorGrades = ({
  grades,
  extraStudents,
  fetchGradesByCourse,
  createGrade,
  updateGrade,
  totalPages,
  currentPage,
  loading,
  error,
}) => {
  const { id: courseId } = useParams();

  const [addingGradeFor, setAddingGradeFor] = useState(null);
  const [editingGrade, setEditingGrade] = useState(null);
  const [newGrade, setNewGrade] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [page, setPage] = useState(currentPage || 1);

  useEffect(() => {
    if (courseId) {
      fetchGradesByCourse(courseId, page);
    }
  }, [courseId, page, fetchGradesByCourse]);

  const handleAddGradeClick = (student) => {
    setAddingGradeFor(student);
    setNewGrade('');
  };

  const handleEditGrade = (grade) => {
    setEditingGrade(grade);
    setNewGrade(grade.value.toString());
  };

  const handleSaveGrade = async () => {
    const numericGrade = parseFloat(newGrade);
    if (!newGrade || isNaN(numericGrade) || numericGrade < 0 || numericGrade > 10) {
      setAddingGradeFor(null);
      setNewGrade('');
      toast.error("Operación no guardada: La nota debe estar entre 0 y 10")
      return;
    }
    try {
      await createGrade({
        studentId: addingGradeFor._id,
        courseId,
        value: numericGrade,
      });
      setAddingGradeFor(null);
      setNewGrade('');
      fetchGradesByCourse(courseId, page);
    } catch (err) {
      console.error(err);
    }
  };

  const handleConfirmEdit = async () => {
    const numericGrade = parseFloat(newGrade);
    if (isNaN(numericGrade) || numericGrade < 0 || numericGrade > 10) {
      setEditingGrade(null);
      setNewGrade('');
      setShowConfirmModal(false);
      toast.error("Operación no guardada: La nota debe estar entre 0 y 10")
      return;
    }

    try {
      await updateGrade(editingGrade._id, {
        value: numericGrade,
      });
      setEditingGrade(null);
      setNewGrade('');
      setShowConfirmModal(false);
      fetchGradesByCourse(courseId, page);
    } catch (err) {
      console.error(err);
    }
  };

  const renderPagination = () => {
    if (!totalPages || totalPages <= 1) return null;
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

  return (
    <div className="ui middle aligned center aligned grid" style={{ paddingTop: '2rem' }}>
      <div className="column" style={{ maxWidth: '90%' }}>
        <div className="ui card fluid">
          <div className="content">
            <h2 className="ui header">Estudiantes del Curso</h2>

            {error && (
              <div className="ui negative message">
                <div className="header">Error al cargar datos</div>
                <p>{error}</p>
              </div>
            )}

            <h3>Inscriptos sin nota</h3>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Nombre del Alumno</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className="center aligned">Cargando...</td>
                  </tr>
                ) : extraStudents?.length > 0 ? (
                  extraStudents.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>
                        <button
                          className="ui mini blue button"
                          onClick={() => handleAddGradeClick(student)}
                        >
                          Agregar Nota
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="center aligned">No hay estudiantes pendientes de nota</td>
                  </tr>
                )}
              </tbody>
            </table>

            <h3>Estudiantes con nota registrada</h3>
            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Nombre del Alumno</th>
                  <th>Email</th>
                  <th>Nota</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="center aligned">Cargando...</td>
                  </tr>
                ) : grades?.length > 0 ? (
                  grades.map((grade) => (
                    <tr key={grade._id}>
                      <td>{grade.student?.name}</td>
                      <td>{grade.student?.email}</td>
                      <td>{grade.value}</td>
                      <td>
                        <button
                          className="ui mini green button"
                          onClick={() => handleEditGrade(grade)}
                        >
                          Editar Nota
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="center aligned">No hay notas registradas</td>
                  </tr>
                )}
              </tbody>
            </table>

            {totalPages > 1 && renderPagination()}
          </div>
        </div>
      </div>

      {(addingGradeFor || editingGrade) && (
        <GradeModal
          studentName={(addingGradeFor || editingGrade?.student)?.name}
          gradeValue={newGrade}
          onChange={(e) => setNewGrade(e.target.value)}
          onCancel={() => {
            setAddingGradeFor(null);
            setEditingGrade(null);
            setNewGrade('');
          }}
          onSave={() => {
            if (editingGrade) {
              setShowConfirmModal(true);
            } else {
              handleSaveGrade();
            }
          }}
        />
      )}

      {showConfirmModal && (
        <Modal
          modalTitle="Confirmar edición"
          modalDescription="¿Estás seguro que querés cambiar la nota a"
          productName={newGrade}
          onCancel={() => setShowConfirmModal(false)}
          onConfirm={handleConfirmEdit}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  grades: state.grade.gradesByCourse?.grades ?? [],
  extraStudents: state.grade.gradesByCourse?.extraStudents ?? [],
  totalPages: state.grade.gradesByCourse?.totalPages ?? 1, 
  loading: state.grade.operations.fetchGradesByCourse?.loading,
  error: state.grade.operations.fetchGradesByCourse?.error,
});

const mapDispatchToProps = {
  fetchGradesByCourse,
  createGrade,
  updateGrade,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProfessorGrades);
