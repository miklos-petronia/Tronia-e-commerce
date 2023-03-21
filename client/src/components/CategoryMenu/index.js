// import react dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import apollo dependency
import { useQuery } from '@apollo/client';

// import utils dependencies
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { categories } = state;
    const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    // if categoryData, loading, or dispatch is updated, update category
    useEffect(() => {
        // retrieved from server
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories,
            });
            categoryData.categories.forEach((category) => {
                idbPromise('categories', 'put', category);
            });
        } 

        // get cache from idb
        else if (!loading) {
            idbPromise('categories', 'get').then((categories) => {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: categories,
                });
            });
        }
    }, [categoryData, loading, dispatch]);