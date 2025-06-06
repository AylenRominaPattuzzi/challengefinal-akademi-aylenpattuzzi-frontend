import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getCourseById, updateCourse } from '../../redux/actions/courseActions';
import { validateCourse } from '../../utils/ValidateForm';
import Input from '../common/Input';
import FieldError from '../common/FieldError';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Loading from '../common/Loading';

const CourseDetail = ({
  course,
  getCourseById,
  updateCourse,
  isLoadingCourse,
  isUpdatingCourse,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [capacity, setCapacity] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');  
  const [fieldErrors, setFieldErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [openCancelModal, setOpenCancelModal] = useState(false);

  useEffect(() => {
      getCourseById(id);
  }, [getCourseById, id]);

  useEffect(() => {
    if (course) {
      setTitle(course.title || '');
      setDescription(course.description || '');
      setStartDate(course.startDate?.substring(0, 10) || '');
      setEndDate(course.endDate?.substring(0, 10) || '');
      setCapacity(course.capacity ?? '');
      setCategory(course.category || '');
      setPrice(course.price ?? '');  
    }
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      description,
      startDate,
      endDate,
      capacity: parseInt(capacity, 10),
      category,
      price: parseFloat(price), 
    };

    const errors = validateCourse(updatedData);

    if (!price || isNaN(price) || parseFloat(price) < 0) {
      errors.price = 'Precio inválido';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});

    try {
      await updateCourse(id, updatedData);
      setDisabled(true);
      navigate('/professor/my-courses');
    } catch (err) {
   
    }
  };

  const handleCancelEdit = () => {
    navigate('/list-courses');
    setDisabled(true);
    setOpenCancelModal(false);
  };

  return (
    <div className="ui segment">
      <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
      {isLoadingCourse && <Loading />}
        <div className="column" style={{ maxWidth: 500 }}>
          <div className={`ui card fluid ${isLoadingCourse || isUpdatingCourse ? 'loading' : ''}`}>
            <div className="content">
              <form onSubmit={handleSubmit} noValidate className="ui form">
                <h2 className="ui header">Detalle de Curso</h2>

                <Input
                  label="Título"
                  type="text"
                  value={title}
                  onChange={e => {
                    setTitle(e.target.value);
                    setFieldErrors(prev => ({ ...prev, title: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el título del curso"
                />
                <FieldError message={fieldErrors.title} />

                <Input
                  label="Descripción"
                  type="text"
                  value={description}
                  onChange={e => {
                    setDescription(e.target.value);
                    setFieldErrors(prev => ({ ...prev, description: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese la descripción del curso"
                />
                <FieldError message={fieldErrors.description} />

                <Input
                  label="Fecha de Inicio"
                  type="date"
                  value={startDate}
                  onChange={e => {
                    setStartDate(e.target.value);
                    setFieldErrors(prev => ({ ...prev, startDate: '' }));
                  }}
                  disabled={disabled}
                />
                <FieldError message={fieldErrors.startDate} />

                <Input
                  label="Fecha de Fin"
                  type="date"
                  value={endDate}
                  onChange={e => {
                    setEndDate(e.target.value);
                    setFieldErrors(prev => ({ ...prev, endDate: '' }));
                  }}
                  disabled={disabled}
                />
                <FieldError message={fieldErrors.endDate} />

                <Input
                  label="Capacidad"
                  type="number"
                  value={capacity}
                  onChange={e => {
                    setCapacity(e.target.value);
                    setFieldErrors(prev => ({ ...prev, capacity: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese la capacidad del curso"
                />
                <FieldError message={fieldErrors.capacity} />

                <Input
                  label="Categoría"
                  type="text"
                  value={category}
                  onChange={e => {
                    setCategory(e.target.value);
                    setFieldErrors(prev => ({ ...prev, category: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese la categoría del curso"
                />
                <FieldError message={fieldErrors.category} />

                <Input
                  label="Precio"
                  type="number"
                  value={price}
                  onChange={e => {
                    setPrice(e.target.value);
                    setFieldErrors(prev => ({ ...prev, price: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el precio del curso"
                />
                <FieldError message={fieldErrors.price} />

                <div className="ui buttons" style={{ marginTop: '1em' }}>
                  {disabled ? (
                    <Button texto="Editar" type="button" onClick={() => setDisabled(false)} />
                  ) : (
                    <>
                      <Button texto="Cancelar" type="button" onClick={() => setOpenCancelModal(true)} color="red" />
                      <Button texto="Guardar" type="submit" disabled={isUpdatingCourse} color="green" />
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {openCancelModal && (
        <Modal
          onCancel={() => setOpenCancelModal(false)}
          onConfirm={handleCancelEdit}
          modalTitle="Cancelar edición"
          modalDescription={`¿Estás seguro de cancelar la edición del curso "${title}"?`}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  course: state.course?.course ?? null,
  operations: state.course?.operations ?? {},
  isLoadingCourse: state.course?.operations?.getCourseById?.loading ?? false,
  isUpdatingCourse: state.course?.operations?.updateCourse?.loading ?? false,
  errorLoadingCourse: state.course?.operations?.getCourseById?.error ?? null,
  errorUpdatingCourse: state.course?.operations?.updateCourse?.error ?? null,
});

const mapDispatchToProps = {
  getCourseById,
  updateCourse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CourseDetail);
