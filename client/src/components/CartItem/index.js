// import react dependencies
import React from 'react';
import { useDispatch } from 'react-redux';

// import utils dependencies
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();

    // remove item with matching item._id from cart
    const removeFromCart = item => {
        dispatch({
            type: REMOVE_FROM_CART,
            _id: item._id
        });
        idbPromise('cart', 'delete', { ...item });
    };