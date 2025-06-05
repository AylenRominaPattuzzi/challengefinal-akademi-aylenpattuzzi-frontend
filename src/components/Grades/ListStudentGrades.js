import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchGradesByStudent } from '../../redux/actions/gradeActions';

const ListStudentGrades = ({
  grades,
  loading,
  error,
  fetchGradesByStudent,
}) => {

  useEffect(() => {
      fetchGradesByStudent();
  }, [ fetchGradesByStudent]);

  return (
    <div className="ui middle aligned center aligned grid" style={{ paddingTop: '2rem' }}>
      <div className="column" style={{ maxWidth: '90%' }}>
        <div className="ui card fluid">
          <div className="content">
            <h2 className="ui header">Mis Calificaciones</h2>

            {error && (
              <div className="ui negative message">
                <div className="header">Error al cargar calificaciones</div>
                <p>{error}</p>
              </div>
            )}

            <table className="ui celled table">
              <thead>
                <tr>
                  <th>Curso</th>
                  <th>Nota</th>
                  <th>Fecha</th>
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
                      <td>{grade.course?.title || 'Curso desconocido'}</td>
                      <td>{grade.value}</td>
                      <td>{new Date(grade.dateAssigned).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="center aligned">No hay calificaciones registradas</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  grades: state.grade.grades,
  loading: state.grade.operations.fetchGradesByStudent.loading,
  error: state.grade.operations.fetchGradesByStudent.error,
});

const mapDispatchToProps = {
  fetchGradesByStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStudentGrades);
