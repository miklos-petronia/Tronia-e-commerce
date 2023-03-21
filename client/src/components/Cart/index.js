// import react dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import apollo dependency
import { useLazyQuery } from '@apollo/client';

// import stripe dependency
import { loadStripe } from '@stripe/stripe-js';

// import utils dependencies
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import Auth from '../../utils/auth';

// import component
import CartItem from '../CartItem';

// import style
import './style.css';

// returns a promise with the stripe object
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    // if data is updated, and data object exists, redirect to checkout referencing sessionId
    useEffect(() => {
        if (data) {
            stripePromise.then((res) => {
                res.redirectToCheckout({ sessionId: data.checkout.session });
            });
        }
    }, [data]);

    // if cart.length or dispatch is updated, get items from session and populate cart if it is empty
    useEffect(() => {
        async function getCart() {
            const cart = await idbPromise('cart', 'get');
            dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        }

        if (!state.cart.length) {
            getCart();
        }
    }, [state.cart.length, dispatch]);

    // toggle car when cart icon is clicked
    function toggleCart() {
        dispatch({ type: TOGGLE_CART });
    }

    // loop through each item in cart, mutiply item.price by the item.purchaseQuantity, and then add to the sum
    function calculateTotal() {
        let sum = 0;
        state.cart.forEach((item) => {
            sum += item.price * item.purchaseQuantity;
        });
        return sum.toFixed(2);
    }
