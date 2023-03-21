// import react dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import apollo dependency
import { useQuery } from '@apollo/client';

// import utils dependencies
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
