import { MainPage } from '../../pages/main-page/main-page';
import { RENTAL_OFFERS_COUNT } from '../../const';

function App() {
  return <MainPage rentalOffersCount={RENTAL_OFFERS_COUNT} />;
}

export { App };