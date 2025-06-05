import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createGrade, fetchStudentsWithCoursesByProfessor } from '../../redux/actions/gradeActions';
import Input from '../common/Input';
import Button from '../common/Button';
import FieldError from '../common/FieldError';
import { Message } from '../common/Message';

const CreateGrade = ({ 
  createGrade, 
  fetchStudentsWithCoursesByProfessor, 
  studentsWithCourses, 
  isCreatingGrade, 
  errorCreatingGrade, 
  professorId 
}) => {
  const { studentId } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [grade, setGrade] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    fetchStudentsWithCoursesByProfessor(professorId);
  }, [fetchStudentsWithCoursesByProfessor, professorId]);

  useEffect(() => {
    if (studentsWithCourses && studentId) {
      const found = studentsWithCourses.find(s => String(s.id) === studentId);
      setStudent(found || null);
    }
  }, [studentsWithCourses, studentId]);

  const validateGrade = (value) => {
    const errors = {};
    if (!value || isNaN(value) || value < 0 || value > 10) {
      errors.grade = 'Ingrese una nota válida entre 0 y 10';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateGrade(grade);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      await createGrade({
        studentId,
        grade: parseFloat(grade)
      });

      setShowSuccessMessage(true);
      setTimeout(() => {
        navigate('/professor/students');
      }, 2000);
    } catch (error) {
      // Error ya se maneja en redux
    }
  };

  if (!student) {
    return <div className="ui active centered inline loader"></div>;
  }

  return (
    <div className="ui segment">
      {showSuccessMessage && (
        <Message message="Nota cargada con éxito" stateMessage="positive" />
      )}

      {errorCreatingGrade && (
        <Message message={errorCreatingGrade} stateMessage="negative" />
      )}

      <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
        <div className="column" style={{ maxWidth: 500 }}>
          <div className={`ui card fluid ${isCreatingGrade ? 'loading' : ''}`}>
            <div className="content">
              <form onSubmit={handleSubmit} noValidate className="ui form">
                <h2 className="ui header">Cargar Nota</h2>

                <div className="ui segment">
                  <p><strong>Nombre:</strong> {student.name}</p>
                  <p><strong>Curso:</strong> {student.course?.title}</p>
                </div>

                <Input
                  label="Nota"
                  type="number"
                  value={grade}
                  onChange={e => {
                    setGrade(e.target.value);
                    setFieldErrors(prev => ({ ...prev, grade: '' }));
                  }}
                  placeholder="Ingrese la nota del alumno"
                />
                <FieldError message={fieldErrors.grade} />

                <Button 
                  texto="Guardar Nota" 
                  type="submit" 
                  color="green" 
                  disabled={isCreatingGrade} 
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  studentsWithCourses: state.grade?.studentsWithCourses || [],
  isCreatingGrade: state.grade?.operations?.createGrade?.loading || false,
  errorCreatingGrade: state.grade?.operations?.createGrade?.error || null,
  professorId: state.auth?.user?.id || null, 
});

const mapDispatchToProps = {
  createGrade,
  fetchStudentsWithCoursesByProfessor
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGrade);
