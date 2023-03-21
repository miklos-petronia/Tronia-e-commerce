// import react dependencies
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// import apollo dependency
import { useQuery } from '@apollo/client';

// import utils dependencies
import {
    REMOVE_FROM_CART,
    UPDATE_CART_QUANTITY,
    ADD_TO_CART,
    UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';

// import component
import Cart from '../components/Cart';

// import assset
import spinner from '../assets/spinner.gif';

function Detail() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { id } = useParams();
    const [currentProduct, setCurrentProduct] = useState({});
    const { products, cart } = state;
    const { loading, data } = useQuery(QUERY_PRODUCTS);

    // if data, loading, or dispatch is updated, update products
    useEffect(() => {
        // already in global store
        if (products.length) {
            setCurrentProduct(products.find((product) => product._id === id));
        }
        // retrieved from server
        else if (data) {
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
            idbPromise('products', 'get').then((indexedProducts) => {
                dispatch({
                    type: UPDATE_PRODUCTS,
                    products: indexedProducts,
                });
            });
        }
    }, [products, data, loading, dispatch, id]);
