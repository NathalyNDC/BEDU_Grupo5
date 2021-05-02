import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Filter from '../../../components/Filter/Filter';
import TableInfo from '../../../components/UI/TableInfo/TableInfo';
import Spinner from '../../../components/UI/Spinner/Spinner';

import { Card } from 'react-bootstrap'

import { getUsers } from '../../../services';

import classes from './Users.module.css';

const Users = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUsers({ setUsers, setLoading });
    }, [])


    return (
        <div className={classes.Users}>
            <Filter />
            <Card className={classes.Card}>
                {loading ?
                    <Spinner /> :
                    <div className={classes.Table}>
                        <TableInfo
                            headers={['ID', 'Tipo', 'Nombre(s)', 'Apellido(s)', 'Email', 'Estado', 'Detalles']}
                            rows={users.map(el => (
                                <tr key={el._id}>
                                    <td>{el._id.substring(el._id.length - 7)}</td>
                                    <td>{el.type}</td>
                                    <td>{el.firstName}</td>
                                    <td>{el.lastName}</td>
                                    <td>{el.email}</td>
                                    <td>{el.status ? 'Activo' : 'Desactivado'}</td>
                                    <td><Link to={`/admin/users/${el._id}`}>Ver</Link></td>
                                </tr>
                            ))
                            }
                        />
                    </div>
                }
            </Card>
        </div>
    )
}

export default Users;
