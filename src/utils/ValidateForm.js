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


  export const validateUser = (user = {}) => {
    const errors = {};
    const { name, email, password } = user;
  
    if (!name || name.trim() === '') {
      errors.name = 'El nombre es obligatorio';
    }
  
    if (!email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      errors.email = 'Debe ingresar un correo electrónico válido';
    }
  
    if (user.password && user.password.length < 8) {
      errors.password = 'La contraseña debe tener al menos 8 caracteres';
    }
  
    return errors;
  };
  