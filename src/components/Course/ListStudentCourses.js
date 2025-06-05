import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getCoursesByStudent } from '../../redux/actions/courseActions'; 
import { cancelEnrollment } from '../../redux/actions/enrollmentActions';
import { useNavigate } from 'react-router-dom';
import { CardCourse } from '../common/CardCourse';
import Modal from '../common/Modal';

const ListStudentCourses = ({ courses, getCoursesByStudent, cancelEnrollment, loading, error }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    getCoursesByStudent();
  }, [getCoursesByStudent]);

  const handleViewCourse = (id) => {
    navigate(`/course-detail/${id}`);
  };

  const handleOpenModal = (course) => {
    setSelectedCourse(course);
    setShowModal(true);
  };

  const handleCancelEnrollment = async () => {
    console.log(1);
    
    if (selectedCourse?.enrollmentId) {
      console.log(2);
      
      await cancelEnrollment(selectedCourse.enrollmentId);
      await getCoursesByStudent(); 
    }
    setShowModal(false);
    setSelectedCourse(null);
  };

  if (loading) {
    return <div className="ui active centered inline loader" />;
  }

  if (error) {
    return (
      <div className="ui negative message">
        <div className="header">Error al obtener cursos</div>
        <p>{error}</p>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return <div className="ui message info">No estás inscripto en ningún curso.</div>;
  }

  return (
    <div className="ui container" style={{ paddingTop: '2rem' }}>
      <h2 className="ui header">Mis cursos</h2>
      <div className="ui three stackable cards">
        {courses.map((course) => (
          <CardCourse 
            key={course._id} 
            course={course} 
            onView={handleViewCourse} 
            isEnrolled={true} 
            onUnenroll={() => handleOpenModal(course)} 
          />
        ))}
      </div>

      {showModal && selectedCourse && (
        <Modal
          productName={selectedCourse.title}
          modalTitle="¿Desinscribirse del curso?"
          modalDescription="¿Estás seguro de que deseas desinscribirte del curso"
          onCancel={() => setShowModal(false)}
          onConfirm={handleCancelEnrollment}    
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  courses: state.course.courses,
  loading: state.course.operations.fetchCoursesByStudent?.loading,
  error: state.course.operations.fetchCoursesByStudent?.error,
});

const mapDispatchToProps = {
  getCoursesByStudent,
  cancelEnrollment,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListStudentCourses);
