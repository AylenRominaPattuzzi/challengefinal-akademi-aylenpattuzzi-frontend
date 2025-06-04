// Validación de Login
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

// Validación de "Olvidé mi contraseña"
export const validateForgotPassword = ({ email }) => {
  const errors = {};

  if (!email || email.trim() === '') {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'El correo electrónico no es válido';
  }

  return errors;
};

// Validación de cambio de contraseña
export const validateResetPassword = ({ password }) => {
  const errors = {};

  if (!password || password.trim() === '') {
    errors.password = 'La contraseña es obligatoria';
  } else if (password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres';
  }

  return errors;
};

// Validación de usuario
export const validateUser = ({ name, email, password, specialty } = {}) => {
  const errors = {};

  if (!name || name.trim() === '') {
    errors.name = 'El nombre es obligatorio';
  }

  if (!email || email.trim() === '') {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'El correo electrónico no es válido';
  }

  if (password && password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres';
  }

  return errors;
};
export const validateProfessor = ({ name, email, password, specialty } = {}) => {
  const errors = validateUser({ name, email, password, specialty }) || {};

  if (!specialty || specialty.trim() === '') {
    errors.specialty = 'La especialidad es obligatoria';
  }

  return errors;

}
// Validación de curso
export const validateCourse = ({ title, startDate, endDate, capacity, category }) => {
  const errors = {};

  if (!title || title.trim() === '') {
    errors.title = 'El título es obligatorio';
  }

  if (!startDate) {
    errors.startDate = 'La fecha de inicio es obligatoria';
  }

  if (!endDate) {
    errors.endDate = 'La fecha de fin es obligatoria';
  }

  if (!capacity || isNaN(capacity) || capacity <= 0) {
    errors.capacity = 'La capacidad debe ser un número válido mayor a 0';
  }

  if (!category || category.trim() === '') {
    errors.category = 'La categoría es obligatoria';
  }

  return errors;
};
