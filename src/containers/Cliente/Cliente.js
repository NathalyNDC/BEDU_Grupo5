import React, { useState, useEffect } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import OrderCard from '../OrderCard/OrderCard'
import Foods from './Foods/Foods';
import OrderHistory from '../OrderHistory/OrderHistory';
import NotFound from '../../components/NotFound/NotFound';

import { filterOrders, updateState } from '../../services';

const Client = () => {
    const { path } = useRouteMatch();
    const [order, setOrder] = useState({})
    const [orders, setOrders] = useState([]);

    const changeStatusHandler = async (id) => {
        let ordersArray = [...orders];
        let indexModif = ordersArray.findIndex(element => element._id === id);
        await updateState({
            id: ordersArray[indexModif]._id,
            data: { status: 0 },
            setOrder
        });
        await filterOrders({
            setOrders, filter: { status: -1 }
        });
    }

    useEffect(() => {
        filterOrders({
            setOrders, filter: { status: -1 }
        });
        const interval = setInterval(() => {
            filterOrders({
                setOrders, filter: { status: -1 }
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [])

    return (
        <>
            {orders.length !== 0 && <OrderCard changeStatusHandler={changeStatusHandler} order={orders[0]} />}
            <Switch>
                <Route path={`${path}/`} exact>
                    <Foods />
                </Route>
                <Route path={`${path}/my-orders`}>
                    <OrderHistory />
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}

export default Client;
