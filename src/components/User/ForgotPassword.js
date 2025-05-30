import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../redux/actions/userActions';
import { validateForgotPassword } from '../../utils/ValidateForm';
import Input from '../common/Input';
import Button from '../common/Button';
import FieldError from '../common/FieldError';
import { Message } from '../common/Message';
import Loading from '../common/Loading';

const ForgotPassword = ({ user, forgotPassword }) => {
    const [email, setEmail] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    // Limpia el campo email tras éxito
    useEffect(() => {
        if (user.forgotPasswordSuccess) {
            setEmail('');
        }
    }, [user.forgotPasswordSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.forgotPasswordLoading) return;

        const errors = validateForgotPassword({ email });
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});
        forgotPassword(email);
    };

    return (
        <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
            <div className="column" style={{ maxWidth: 450 }}>
                <div className="ui card fluid">
                    <div className="content">
                        <form className="ui form" onSubmit={handleSubmit} noValidate>
                            <h2 className="ui header">Recuperar Contraseña</h2>

                            {user.recoverPasswordError && (
                                <div className="ui red message">{user.recoverPasswordError}</div>
                            )}

                            {user.recoverPasswordSuccess && (
                                <Message
                                    message="Revisa tu email para restablecer la contraseña."
                                    stateMessage="positive"
                                />
                            )}

                            <Input
                                label="Correo electrónico"
                                type="email"
                                placeholder="Ingrese su correo electrónico"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, email: '' }));
                                }}
                                disabled={user.forgotPasswordLoading}
                            />
                            <FieldError message={fieldErrors.email} />

                            <Button
                                type="submit"
                                texto={user.forgotPasswordLoading ? 'Enviando...' : 'Enviar'}
                                disabled={user.forgotPasswordLoading}
                            />
                        </form>

                        {user.forgotPasswordLoading && <Loading />}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    user: state.register || {},
});

const mapDispatchToProps = {
    forgotPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);