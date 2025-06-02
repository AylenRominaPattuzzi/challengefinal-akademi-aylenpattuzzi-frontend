import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userActions';

const ListUsers = ({ users, fetchUsers }) => {
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);


    return (
        <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
            <div className="column" style={{ maxWidth: '90%' }}>
                <div className="ui card fluid">
                    <div className="content">
                        <h2 className="ui header">Listado de Usuarios</h2>

                        <table className="ui celled table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Rol</th>
                                    <th>Número de Documento</th>
                                    <th>Fecha de Nacimiento</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.length > 0 ? (
                                    users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>{user?.profile?.documentNumber || '-'}</td>
                                            <td>{user?.profile?.birthDate ? new Date(user.profile.birthDate).toLocaleDateString() : '-'}</td>
                                            <td>
                                                <button className="ui button mini">Ver</button>
                                                <button className="ui button mini primary"  style={{ marginLeft: '5px' }}>Editar</button>
                                                <button className="ui button mini negative" style={{ marginLeft: '5px' }}>Eliminar</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="center aligned">No hay usuarios disponibles</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    users: state.user?.users || [],
});

const mapDispatchToProps = {
    fetchUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
