import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import Modal from '../common/Modal';
import Loading from '../common/Loading';
import Pagination from '../common/Pagination';

const ListUsers = ({
    users,
    fetchUsers,
    deleteUser,
    totalPages,
    currentPage,
    isDeletingUser,
    errorUsers,
    loading
}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(currentPage || 1);
    const [role, setRole] = useState('');
    const [search, setSearch] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        fetchUsers({ page, role, search });
    }, [fetchUsers, page, role, search]);

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowModal(true);
    };

    const confirmDelete = () => {
        if (userToDelete) {
            deleteUser(userToDelete._id);
            setShowModal(false);
        }
    };

    const cancelDelete = () => {
        setShowModal(false);
        setUserToDelete(null);
    };

    const handleEditUser = (id) => {
        navigate(`/user-detail/${id}?edit=true`);
    };


    return (
        <div className="ui middle aligned center aligned grid" style={{ paddingTop: '2rem' }}>
            {loading && <Loading />}
            <div className="column" style={{ maxWidth: '90%' }}>
                <div className="ui card fluid">
                    <div className="content">
                        <h2 className="ui header">Listado de Usuarios</h2>

                        <div className="ui form" style={{ marginBottom: '1rem' }}>
                            <div className="fields">
                                <div className="field">
                                    <select
                                        className="ui dropdown"
                                        value={role}
                                        onChange={(e) => {
                                            setRole(e.target.value);
                                            setPage(1);
                                        }}
                                    >
                                        <option value="">Todos</option>
                                        <option value="superadmin">SUPERADMIN</option>
                                        <option value="student">ESTUDIANTE</option>
                                        <option value="professor">PROFESOR</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <input
                                        type="text"
                                        placeholder="Buscar usuario..."
                                        value={search}
                                        onChange={(e) => {
                                            setSearch(e.target.value);
                                            setPage(1);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        {errorUsers && (
                            <div className="ui negative message">
                                <div className="header">Error al obtener usuarios</div>
                                <p>{errorUsers}</p>
                            </div>
                        )}

                        <table className="ui celled table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Nro. Documento</th>
                                    <th>Fecha Nacimiento</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 ? (
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user?.profile?.documentNumber || '-'}</td>
                                            <td>
                                                {user?.profile?.birthDate
                                                    ? new Date(user.profile.birthDate).toLocaleDateString()
                                                    : '-'}
                                            </td>
                                            <td>
                                                <button
                                                    className="ui mini primary button"
                                                    onClick={() => handleEditUser(user._id)}
                                                >
                                                    Detalle
                                                </button>
                                                <button
                                                    className={`ui mini negative button ${isDeletingUser ? 'loading disabled' : ''}`}
                                                    onClick={() => handleDeleteClick(user)}
                                                >
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="center aligned">
                                            No hay usuarios disponibles
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <Pagination
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={(newPage) => setPage(newPage)}
                        />
                    </div>
                </div>
            </div>

            {showModal && userToDelete && (
                <Modal
                    modalTitle="Confirmar eliminación"
                    modalDescription="¿Estás seguro de que deseas eliminar al usuario"
                    productName={userToDelete.name}
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
};

const mapStateToProps = (state) => ({
    users: state.user.users,
    totalPages: state.user.totalPages,
    currentPage: state.user.currentPage,
    isDeletingUser: state.user.operations.deleteUser.loading,
    errorUsers: state.user.operations.fetchUsers.error,
});

const mapDispatchToProps = {
    fetchUsers,
    deleteUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
