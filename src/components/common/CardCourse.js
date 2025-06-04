import React from 'react';
import './CardCourse.css';

export const CardCourse = ({ course, onView, onDelete }) => {
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

      <div className="extra content">
      
        {courseId && (
          <a className="ui blue basic button" href={`/courses/${courseId}`}>
            <i className="eye icon"></i> Detalle
          </a>
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
