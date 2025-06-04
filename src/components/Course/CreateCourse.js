import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createCourse } from '../../redux/actions/courseActions';
import Input from '../common/Input';
import Button from '../common/Button';
import FieldError from '../common/FieldError';
import { useNavigate } from 'react-router-dom';
import { validateCourse } from '../../utils/ValidateForm';

const CreateCourse = ({ createCourse }) => {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [capacity, setCapacity] = useState('');
    const [category, setCategory] = useState('');
    const [studentsEnrolled, setStudentsEnrolled] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        const errors = validateCourse({ title, description, startDate, endDate, capacity, category });
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});
        setIsLoading(true);

        try {
            await createCourse({
                title,
                description,
                startDate,
                endDate,
                capacity: parseInt(capacity, 10),
                category,
                studentsEnrolled: studentsEnrolled ? parseInt(studentsEnrolled, 10) : 0
            });

            // Limpiar campos
            setTitle('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setCapacity('');
            setCategory('');
            setStudentsEnrolled('');

            alert('Curso creado con éxito');
            navigate('/courses');
        } catch (err) {
            const message = err?.response?.data?.message || 'Hubo un error al crear el curso';
            alert(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
            <div className="column" style={{ maxWidth: 450 }}>
                <div className="ui card fluid">
                    <div className="content">
                        <form className="ui form" onSubmit={handleSubmit} noValidate>
                            <h2 className="ui header">Crear Curso</h2>

                            <Input
                                label='Título'
                                type='text'
                                placeholder='Ingrese un título'
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, title: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.title} />

                            <Input
                                label='Descripción'
                                type='text'
                                placeholder='Ingrese una descripción'
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, description: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.description} />

                            <Input
                                label='Fecha de inicio'
                                type='date'
                                value={startDate}
                                onChange={(e) => {
                                    setStartDate(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, startDate: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.startDate} />

                            <Input
                                label='Fecha de fin'
                                type='date'
                                value={endDate}
                                onChange={(e) => {
                                    setEndDate(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, endDate: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.endDate} />

                            <Input
                                label='Capacidad'
                                type='number'
                                placeholder='Ingrese la capacidad'
                                value={capacity}
                                onChange={(e) => {
                                    setCapacity(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, capacity: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.capacity} />

                            <Input
                                label='Categoría'
                                type='text'
                                placeholder='Ingrese una categoría'
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, category: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.category} />

                            <Button
                                type="submit"
                                texto={isLoading ? 'Creando...' : 'Crear Curso'}
                                disabled={isLoading}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    createCourse,
};

export default connect(null, mapDispatchToProps)(CreateCourse);
