
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


export const validateUser = ({ name, email, documentNumber, birthDate } = {}) => {
  const errors = {};

  if (!name || name.trim() === '') {
    errors.name = 'El nombre es obligatorio';
  }

  if (!email || email.trim() === '') {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'El correo electrónico no es válido';
  }

  if (!documentNumber || documentNumber.trim() === '') {
    errors.documentNumber = 'El número de documento es obligatorio';
  } else if (!/^\d+$/.test(documentNumber.trim())) {
    errors.documentNumber = 'El número de documento debe contener solo números';
  }

  if (!birthDate) {
    errors.birthDate = 'La fecha de nacimiento es obligatoria';
  } else {
    const birth = new Date(birthDate);
    const now = new Date();
    if (birth >= now) {
      errors.birthDate = 'La fecha de nacimiento debe ser anterior a hoy';
    }
  }


  return errors;
};


export const validateCourse = ({ title, startDate, endDate, capacity, category, price }) => {
  const errors = {};

  if (!title || title.trim() === '') {
    errors.title = 'El título es obligatorio';
  }

  if (!price || isNaN(price) || parseFloat(price) <= 0) {
    errors.price = 'El precio debe ser un número mayor a cero';
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

export const validateProfessor = ({ name, email, password, specialty, documentNumber, birthDate } = {}) => {
  const errors = validateUser({ name, email, documentNumber, birthDate }) || {};
  if (password && password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres';
  }
  if (!password || password.trim() === '') {
    errors.password = 'La contraseña es obligatoria';
  }
  if (!specialty || specialty.trim() === '') {
    errors.specialty = 'La especialidad es obligatoria';
  }


  return errors;
};
