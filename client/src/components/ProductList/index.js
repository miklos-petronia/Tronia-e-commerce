// import react dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import apollo dependency
import { useQuery } from '@apollo/client';

// import utils dependencies
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

// import component
import ProductItem from '../ProductItem';

// import assset
import spinner from '../../assets/spinner.gif';

function ProductList() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { currentCategory } = state;
    const { loading, data } = useQuery(QUERY_PRODUCTS);

    // if data, loading, or dispatch is updated, update products
    useEffect(() => {
        // retrieved from server
        if (data) {
            dispatch({
                type: UPDATE_PRODUCTS,
                products: data.products,
            });
            data.products.forEach((product) => {
                idbPromise('products', 'put', product);
            });
        }
        // get cache from idb
        else if (!loading) {
            idbPromise('products', 'get').then((products) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: products,
                });
            });
        }
    }, [data, loading, dispatch]);
