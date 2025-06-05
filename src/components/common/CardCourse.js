export const CardCourse = ({
  course,
  onDelete,
  isEnrolled,
  onEnroll,
  onUnenroll,
  hideEnrollButton,
  onView,
  onEdit,
  onShowGrades,   
}) => {
  const courseId = course._id || course.id;

  return (
    <div className="ui card">
      <div className="content">
        <a className="header">{course.title}</a>

        {course.category && (
          <div className="meta">
            <span className="date">Categoría: {course.category}</span>
          </div>
        )}

        <div className="description">{course.description}</div>

        {course.price !== undefined && (
          <div className="meta" style={{ marginTop: '0.5rem', fontWeight: 'bold', color: '#2185d0' }}>
            Precio: ${course.price.toFixed(2)}
          </div>
        )}
      </div>

      {(course.startDate || course.endDate || course.capacity) && (
        <div className="extra content">
          {course.startDate && (
            <>
              <span className="date">
                Inicio: {new Date(course.startDate).toLocaleDateString('es-AR')}
              </span>
              <br />
            </>
          )}
          {course.endDate && (
            <>
              <span className="date">
                Fin: {new Date(course.endDate).toLocaleDateString('es-AR')}
              </span>
              <br />
            </>
          )}
          {course.capacity && <span className="capacity">Cupos: {course.capacity}</span>}
        </div>
      )}

      <div className="extra content" style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        {courseId && onView && (
          <button className="ui blue basic button" onClick={() => onView(courseId)}>
            <i className="eye icon"></i> Detalle
          </button>
        )}

        {onEdit && (
          <button className="ui green basic button" onClick={() => onEdit(courseId)}>
            <i className="edit icon"></i> Editar
          </button>
        )}

        {/* Botón Notas */}
        {onShowGrades && (
          <button className="ui teal basic button" onClick={() => onShowGrades(courseId)}>
            <i className="sticky note icon"></i> Notas
          </button>
        )}

        {!hideEnrollButton && (
          onUnenroll ? (
            <button className="ui red basic button" onClick={() => onUnenroll(course)}>
              <i className="remove user icon"></i> Desinscribirse
            </button>
          ) : (
            <button
              className={`ui blue basic button ${isEnrolled ? 'disabled' : ''}`}
              onClick={onEnroll}
              disabled={isEnrolled}
            >
              <i className="signup icon"></i> {isEnrolled ? 'Inscripto' : 'Inscribirse'}
            </button>
          )
        )}

        {onDelete && (
          <button className="ui red basic button" onClick={() => onDelete(course)}>
            <i className="trash icon"></i> Eliminar
          </button>
        )}
      </div>
    </div>
  );
};
