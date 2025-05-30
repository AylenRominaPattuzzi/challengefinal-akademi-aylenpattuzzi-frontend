export const validateLogin = ({ email, password }) => {
    const errors = {};
  
    if (!email || email.trim() === '') {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'El correo electrónico no es válido';
    }
  
    if (!password || password.trim() === '') {
      errors.password = 'La contraseña es obligatoria';
    }
  
    return errors;
  };
  
  export const validateForgotPassword = ({ email }) => {
    const errors = {};
  
    if (!email || email.trim() === '') {
      errors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'El correo electrónico no es válido';
    }
  
    return errors;
  };
  
  export const validateResetPassword = ({ password }) => {
    const errors = {};
  
    if (!password || password.trim() === '') {
      errors.password = 'La contraseña es obligatoria';
    } else if (password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
  
    return errors;
  };
  