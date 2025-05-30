import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { resetPassword } from '../../redux/actions/userActions';
import { validateResetPassword } from '../../utils/ValidateForm';
import Input from '../common/Input';
import { Message } from '../common/Message';
import FieldError from '../common/FieldError';
import Button from '../common/Button';

const ResetPassword = ({ auth, resetPassword }) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const errors = validateResetPassword({ password });
    if (Object.keys(errors).length > 0) {
      setFieldError(errors.password);
      return;
    }
  
    try {
      await resetPassword(token, password);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setFieldError('Error al actualizar la contraseña');
    }
  };

  return (
    <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
      <div className="column" style={{ maxWidth: 450 }}>
        <div className="ui card fluid">
          <div className="content">
            <form className="ui form" onSubmit={handleSubmit}>
              <h2 className="ui header">Restablecer contraseña</h2>

              {success && (
                <Message
                  tipo="success"
                  texto="Contraseña actualizada correctamente. Redirigiendo al login..."
                />
              )}

              <Input
                label="Nueva contraseña"
                type="password"
                placeholder="Ingrese su nueva contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldError('');
                }}
              />
              <FieldError message={fieldError} />

              <Button type="submit" texto={auth.loading ? 'Cargando...' : 'Actualizar contraseña'} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);