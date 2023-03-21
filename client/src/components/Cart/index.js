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