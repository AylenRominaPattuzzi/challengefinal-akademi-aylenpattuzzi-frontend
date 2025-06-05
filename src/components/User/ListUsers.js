import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';

const ListUsers = ({
    users,
    fetchUsers,
    deleteUser,
    totalPages,
    currentPage,
    isDeletingUser,
    errorUsers,
}) => {
    const navigate = useNavigate();
    const [page, setPage] = useState(currentPage || 1);
    const [role, setRole] = useState('');
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetchUsers({ page, role, search });
    }, [fetchUsers, page, role, search]);

    const handleViewUser = (id) => {
        navigate(`/user-detail/${id}`);
    };

    const handleDeleteUser = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            deleteUser(id);
        }
    };

    const handleEditUser = (id) => {
        navigate(`/user-detail/${id}?edit=true`);
    };

    const renderPagination = () => {
        const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
        return (
            <div className="ui pagination menu">
                {pages.map((p) => (
                    <button
                        key={p}
                        className={`item ${p === page ? 'active' : ''}`}
                        onClick={() => setPage(p)}
                    >
                        {p}
                    </button>
                ))}
            </div>
        );
    };

    return (
        <div className="ui middle aligned center aligned grid" style={{ paddingTop: '2rem' }}>
            <div className="column" style={{ maxWidth: '90%' }}>
                <div className="ui card fluid">
                    <div className="content">
                        <h2 className="ui header">Listado de Usuarios</h2>

                        <div className="ui form" style={{ marginBottom: '1rem' }}>
                            <div className="field">
                                <label>Filtrar por rol:</label>
                                <select
                                    className="ui dropdown"
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                        setPage(1); // reset al cambiar filtro
                                    }}
                                >
                                    <option value="">Todos</option>
                                    <option value="superadmin">SUPERADMIN</option>
                                    <option value="student">ESTUDIANTE</option>
                                    <option value="professor">PROFESOR</option>
                                </select>
                            </div>
                            <div className='field'>
                                <input
                                className="ui"
                                value={search}
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setPage(1); // reset al cambiar filtro
                                    }}
                                ></input>
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
                                                <button className="ui mini primary button" onClick={() => handleEditUser(user._id)}>Detalle</button>
                                                <button
                                                    className={`ui mini negative button ${isDeletingUser ? 'loading disabled' : ''}`}
                                                    onClick={() => handleDeleteUser(user._id)}
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

                        {totalPages > 1 && renderPagination()}
                    </div>
                </div>
            </div>
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



