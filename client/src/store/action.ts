import { createAction } from '@reduxjs/toolkit';
import { OffersList } from '../types/offer';

export const changeCity = createAction<string>('offers/changeCity');
export const loadOffers = createAction<OffersList>('offers/loadOffers');
