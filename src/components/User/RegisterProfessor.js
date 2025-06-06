import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createProfessor } from '../../redux/actions/userActions';
import { validateProfessor } from '../../utils/ValidateForm';
import Input from '../common/Input';
import Button from '../common/Button';
import FieldError from '../common/FieldError';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';

const RegisterProfessor = ({ createProfessor, loading }) => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading) return;

        const errors = validateProfessor({ name, email, password, specialty, documentNumber, birthDate });
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});
        setIsLoading(true);
        try {
            await createProfessor({
                name,
                email,
                password,
                profile: {
                    specialty,
                    documentNumber,
                    birthDate
                }
            });

            setName('');
            setEmail('');
            setPassword('');
            setDocumentNumber('');
            setSpecialty('')
            setBirthDate('');

            navigate('/login');
        } catch (err) {
            console.log(err);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
            {loading && <Loading />}
            <div className="column" style={{ maxWidth: 450 }}>
                <div className="ui card fluid">
                    <div className="content">
                        <form className="ui form" onSubmit={handleSubmit} noValidate>
                            <h2 className="ui header">Registrar Profesor</h2>

                            <Input
                                label='Nombre'
                                type='text'
                                placeholder='Ingrese su nombre'
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, name: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.name} />

                            <Input
                                label='Correo electrónico'
                                type='email'
                                placeholder='Ingrese su correo electrónico'
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, email: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.email} />

                            <Input
                                label="Contraseña"
                                type="password"
                                placeholder="Ingrese una contraseña"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, password: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.password} />

                            <Input
                                label='Especialidad'
                                type='text'
                                placeholder='Ingrese su especialidad'
                                value={specialty}
                                onChange={(e) => {
                                    setSpecialty(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, specialty: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.specialty} />

                            <Input
                                label='Número de documento'
                                type='text'
                                placeholder='Ingrese su número de documento'
                                value={documentNumber}
                                onChange={(e) => {
                                    setDocumentNumber(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, documentNumber: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.documentNumber} />

                            <Input
                                label='Fecha de nacimiento'
                                type='date'
                                value={birthDate}
                                onChange={(e) => {
                                    setBirthDate(e.target.value)
                                    setFieldErrors((prev) => ({ ...prev, birthDate: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.birthDate} />


                            <Button
                                type="submit"
                                texto={isLoading ? 'Registrando...' : 'Registrar'}
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
    createProfessor,
};

export default connect(null, mapDispatchToProps)(RegisterProfessor);
