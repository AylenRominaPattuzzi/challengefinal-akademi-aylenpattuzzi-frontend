import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchGradesByStudent } from '../../redux/actions/gradeActions';
import Loading from '../common/Loading';

const ListStudentGrades = ({
  grades,
  loading,
  error,
  fetchGradesByStudent,
  totalPages,
  currentPage,
}) => {

  const [page, setPage] = useState(currentPage || 1);
  const [search, setSearch] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    fetchGradesByStudent({ page, search, value });
  }, [fetchGradesByStudent, page, search, value]);

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="ui pagination menu" style={{ marginTop: '1rem' }}>
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
      {loading && <Loading />}
      <div className="column" style={{ maxWidth: '90%' }}>
        <div className="ui card fluid">
          <div className="content">
            <h2 className="ui header">Mis Calificaciones</h2>


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
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      setPage(1);
                    }}
                  >
                    <option value="">Todas las notas</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3 </option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
            </div>

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
                    <td colSpan="3" className="center aligned">Cargando...</td>
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
                    <td colSpan="3" className="center aligned">No hay calificaciones registradas</td>
                  </tr>
                )}
              </tbody>
            </table>
            {totalPages > 1 && renderPagination()}
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
  totalPages: state.grade.totalPages,
  currentPage: state.grade.page,
});

const mapDispatchToProps = {
  fetchGradesByStudent,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStudentGrades);
