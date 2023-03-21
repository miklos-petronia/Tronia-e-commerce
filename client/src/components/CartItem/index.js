// import react dependencies
import React from 'react';
import { useDispatch } from 'react-redux';

// import utils dependencies
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
    const dispatch = useDispatch();