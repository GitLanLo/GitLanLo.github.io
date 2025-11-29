import { useState } from 'react';
import { CitiesCardList } from '../../components/cities-card-list/cities-card-list';
import { Logo } from '../../components/logo/logo';
import { Map } from '../../components/map/map';
import { FullOffer, OffersList } from '../../types/offer';

type MainPageProps = {
  rentalOffersCount: number;
  offersList: OffersList;
};

function MainPage({ rentalOffersCount, offersList }: MainPageProps) {
  const [selectedOffer, setSelectedOffer] = useState<FullOffer | null>(null);

  const handleCardMouseEnter = (offer: FullOffer) => {
    setSelectedOffer(offer);
  };

  const handleCardMouseLeave = () => {
    setSelectedOffer(null);
  };

  const city = offersList[0].city; // все предложения в Амстердаме

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              <li className="locations__item">
                <a className="locations__item-link tabs__item tabs__item--active" href="#">
                  <span>Amsterdam</span>
                </a>
              </li>
            </ul>
          </section>
        </div>

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {rentalOffersCount} places to stay in Amsterdam
              </b>

              <div className="cities__places-list places__list tabs__content">
                <CitiesCardList
                  offers={offersList}
                  onCardMouseEnter={handleCardMouseEnter}
                  onCardMouseLeave={handleCardMouseLeave}
                />
              </div>
            </section>

            <div className="cities__right-section">
              <Map
                className="cities__map map"
                city={city}
                points={offersList}
                selectedPoint={selectedOffer}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { MainPage };
