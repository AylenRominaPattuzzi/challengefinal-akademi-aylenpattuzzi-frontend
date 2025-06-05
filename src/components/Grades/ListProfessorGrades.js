import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchGradesByCourse, createGrade } from '../../redux/actions/gradeActions';
import { useNavigate, useParams } from 'react-router-dom';
import GradeModal from '../common/GradeModal';

const ListProfessorGrades = ({
  grades,
  extraStudents,
  fetchGradesByCourse,
  createGrade,
  loading,
  error,
}) => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const [addingGradeFor, setAddingGradeFor] = useState(null);
  const [newGrade, setNewGrade] = useState('');

  useEffect(() => {
    if (courseId) {
      fetchGradesByCourse(courseId);
    }
  }, [courseId, fetchGradesByCourse]);

  const handleAddGradeClick = (student) => {
    setAddingGradeFor(student);
    setNewGrade('');
  };

  const handleEditGrade = (studentId, courseId) => {
    navigate(`/edit-grade?studentId=${studentId}&courseId=${courseId}`);
  };

  const handleSaveGrade = async () => {
    const numericGrade = parseFloat(newGrade);
    if (!newGrade || isNaN(numericGrade) || numericGrade < 0 || numericGrade > 10) {
      alert('Ingrese una nota válida entre 0 y 10');
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
      fetchGradesByCourse(courseId);
    } catch (err) {
      alert('Error al guardar la nota');
      console.error(err);
    }
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
                          onClick={() => handleEditGrade(grade.student?._id, courseId)}
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
          </div>
        </div>
      </div>

      {/* Usamos el modal personalizado */}
      {addingGradeFor && (
        <GradeModal
          studentName={addingGradeFor.name}
          gradeValue={newGrade}
          onChange={(e) => setNewGrade(e.target.value)}
          onCancel={() => {
            setAddingGradeFor(null);
            setNewGrade('');
          }}
          onSave={handleSaveGrade}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  grades: state.grade.gradesByCourse?.grades ?? [],
  extraStudents: state.grade.gradesByCourse?.extraStudents ?? [],
  loading: state.grade.operations.fetchGradesByCourse?.loading,
  error: state.grade.operations.fetchGradesByCourse?.error,
});

const mapDispatchToProps = {
  fetchGradesByCourse,
  createGrade,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListProfessorGrades);
