import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, editUser } from '../../redux/actions/userActions';
import { useNavigate, useParams } from 'react-router-dom';
import { validateUser } from '../../utils/ValidateForm';
import FieldError from '../common/FieldError';
import Input from '../common/Input';
import Button from '../common/Button';
import Modal from '../common/Modal';
import Loading from '../common/Loading';

const UserDetail = ({
  users,
  fetchUsers,
  editUser,
  isLoadingUsers,
  isEditingUser,
  errorEditUser
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [dni, setDni] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);

  const user = users.find(u => u._id === id);

  useEffect(() => {
    if (users.length === 0) fetchUsers();
  }, [fetchUsers, users.length]);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setRole(user.role || '');
      setDni(user.profile?.documentNumber || '');
      setBirthDate(user.profile?.birthDate?.substring(0, 10) || '');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      name,
      email,
      role,
      profile: {
        documentNumber: dni,
        birthDate
      }
    };

    const errors = validateUser({...updatedUser, birthDate: updatedUser.profile.birthDate, documentNumber: updatedUser.profile.documentNumber});
    console.log(errors);
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    await editUser(id, updatedUser);

    if (!errorEditUser) {
      navigate('/list-users');
    }
  };

  const handleCancelEdit = () => {
    navigate('/list-users');
    setDisabled(true);
    setOpen(false);
  };

  return (
    <div className="ui segment">
      {isLoadingUsers && <Loading />}
      <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
        <div className="column" style={{ maxWidth: 450 }}>
          <div className="ui card fluid">
            <div className="content">
              <form
                className={`ui form ${isLoadingUsers || isEditingUser ? 'loading' : ''}`}
                onSubmit={handleSubmit}
                noValidate
              >
                <h2 className="ui header">Detalle de Usuario</h2>

                <Input
                  label="Nombre completo"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setFieldErrors(prev => ({ ...prev, name: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el nombre completo del usuario"
                />
                <FieldError message={fieldErrors.name} />

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors(prev => ({ ...prev, email: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el correo electrónico"
                />
                <FieldError message={fieldErrors.email} />


                {role === 'student' && (
                  <>
                    <Input
                      label="DNI"
                      type="text"
                      value={dni}
                      onChange={(e) => {
                        setDni(e.target.value);
                        setFieldErrors(prev => ({ ...prev, dni: '' }));
                      }}
                      disabled={disabled}
                      placeholder="Ingrese el DNI del estudiante"
                    />
                    <FieldError message={fieldErrors.dni} />

                    <Input
                      label="Fecha de Nacimiento"
                      type="date"
                      value={birthDate}
                      onChange={(e) => {
                        setBirthDate(e.target.value);
                        setFieldErrors(prev => ({ ...prev, birthDate: '' }));
                      }}
                      disabled={disabled}
                    />
                    <FieldError message={fieldErrors.birthDate} />
                  </>
                )}

                <div className="ui buttons">
                  {disabled ? (
                    <Button texto="Editar" type="button" onClick={() => setDisabled(false)} />
                  ) : (
                    <>
                      <Button texto="Cancelar" type="button" onClick={() => setOpen(true)} color="red" />
                      <Button texto="Guardar" type="submit" disabled={isEditingUser} color="green" />
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <Modal
          onCancel={() => setOpen(false)}
          onConfirm={handleCancelEdit}
          modalTitle="Cancelar edición"
          modalDescription={`¿Estás seguro de cancelar la edición del usuario ${name}?`}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.user.users,
  isLoadingUsers: state.user.operations.fetchUsers.loading,
  isEditingUser: state.user.operations.editUser.loading,
  errorEditUser: state.user.operations.editUser.error,
});

const mapDispatchToProps = {
  fetchUsers,
  editUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
