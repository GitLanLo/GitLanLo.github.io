import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers } from './action';
import { CITIES_LOCATION, DEFAULT_CITY_NAME } from '../const';
import { CityOffer, OffersList } from '../types/offer';
import { fullOffers } from '../mocks/offers';

type OffersProcess = {
  city: CityOffer;
  offers: OffersList;
};

const initialCity =
  CITIES_LOCATION.find((city) => city.name === DEFAULT_CITY_NAME) ?? CITIES_LOCATION[0];

const initialState: OffersProcess = {
  city: initialCity,
  offers: fullOffers,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const newCity = CITIES_LOCATION.find((city) => city.name === action.payload);
      if (newCity) {
        state.city = newCity;
      }
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    });
});
