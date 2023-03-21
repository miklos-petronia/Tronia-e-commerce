// import react dependencies
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import apollo dependency
import { useLazyQuery } from '@apollo/client';

// import stripe dependency
import { loadStripe } from '@stripe/stripe-js';