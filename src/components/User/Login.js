import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';
import { validateLogin } from '../../utils/ValidateForm';
import Input from '../common/Input';
import Button from '../common/Button';
import FieldError from '../common/FieldError';
import {jwtDecode} from 'jwt-decode';
import Loading from '../common/Loading';

const saveTokenAndRedirect = (auth, navigate) => {
  localStorage.setItem('token', auth.token);
  localStorage.setItem('role', auth.role);
  switch (auth.role) {
    case 'student':
      navigate('/student/my-courses');
      break;
    case 'professor':
      navigate('/professor/my-courses');
      break
    case 'superadmin':
      navigate('/dashboard');
      break
    default:
      navigate('/');
      break;
  }
  
};

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return true;
    const now = Date.now() / 1000; 
    return decoded.exp < now;
  } catch (e) {
    return true;
  }
};

const Login = ({ auth, loginUser, loading }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (auth && auth.token && !isTokenExpired(auth.token)) {
      saveTokenAndRedirect(auth, navigate);
    }
  }, [auth, navigate]);

  useEffect(() => {
    if (auth.error) {
      setErrorMsg(auth.error);
      setIsLoading(false);
    } else {
      setErrorMsg(null);
    }
  }, [auth.error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return;

    const errors = validateLogin({ email, password });
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsLoading(true);
    setErrorMsg(null);

    try {
      await loginUser({ email, password });
      setEmail('');
      setPassword('');
    } catch (error) {
      setErrorMsg(error.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
          {loading && <Loading/>}
      <div className="column" style={{ maxWidth: 450 }}>
        <div className="ui card fluid">
          <div className="content">
            <form className="ui form" onSubmit={handleSubmit} noValidate>
              <h2 className="ui header">Iniciar sesión</h2>
              {errorMsg && <div className="ui red message">{errorMsg}</div>}

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

              <Button type="submit" texto={isLoading ? 'Cargando...' : 'Ingresar'} disabled={isLoading} />
            </form>
            <br />
            <div >
              <Link to="/register">Regístrate</Link>
            </div>

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
