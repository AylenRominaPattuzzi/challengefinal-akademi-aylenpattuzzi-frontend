import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import { validateLogin } from '../../utils/ValidateForm';
import Input from '../common/Input';
import Button from '../common/Button';
import FieldError from '../common/FieldError';


const guardarTokenYRedirigir = (auth, navigate) => {
  localStorage.setItem('token', auth.token);
  localStorage.setItem('role', auth.role);
  navigate('/dashboard');
};

const Login = ({ auth, loginUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (auth && auth.token) {
      guardarTokenYRedirigir(auth, navigate);
    }
  }, [auth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (auth.loading) return;

    const errors = validateLogin({ email, password });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    loginUser({ email, password });
  };

  return (
    <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
      <div className="column" style={{ maxWidth: 450 }}>
        <div className="ui card fluid">
          <div className="content">
            <form className="ui form" onSubmit={handleSubmit} noValidate>
              <h2 className="ui header">Iniciar sesión</h2>
              {auth.error && <div className="ui red message">{auth.error}</div>}
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="Ingrese su correo electrónico"
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
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: '' }));
                }}
              />
              <FieldError message={fieldErrors.password} />

              <Button type="submit" texto={auth.loading ? 'Cargando...' : 'Ingresar'} />
            </form>

            <div className="ui message">
              <Link to="/recover-password">¿Olvidaste tu contraseña?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth || {},
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);