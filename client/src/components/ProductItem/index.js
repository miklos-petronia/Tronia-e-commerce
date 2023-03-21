// import react dependencies
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

// import utils dependencies
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { pluralize } from "../../utils/helpers"
import { idbPromise } from "../../utils/helpers";

function ProductItem(item) {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { image, name, _id, price, quantity } = item;
    const { cart } = state;