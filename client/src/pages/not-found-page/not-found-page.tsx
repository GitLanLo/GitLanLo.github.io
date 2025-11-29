function NotFoundPage() {
  return (
    <div className="page page--gray page--not-found">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="Rent service logo"
                  width="81"
                  height="41"
                />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--not-found">
        <div className="container">
          <section className="not-found">
            <h1 className="not-found__title">404. Page not found</h1>
            <p className="not-found__description">
              Sorry, the page you are looking for does not exist.
            </p>
            <a className="not-found__link" href="main.html">
              Go to main page
            </a>
          </section>
        </div>
      </main>
    </div>
  );
}

export { NotFoundPage };
