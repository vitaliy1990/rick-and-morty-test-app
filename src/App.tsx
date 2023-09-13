import React, { FC, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from './store';

import css from './App.module.css';
import MainPage from './pages/MainPage/MainPage';
import FallbackErrorBoundary from './components/FallbackErrorBoundary/FallbackErrorBoundary';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Container from './components/Container/Container';
import Loader from './components/Loader/Loader';

const CharactePage = React.lazy(() => import('./pages/СharacterPage/СharacterPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const AppContainer: FC = () => {
  return (
    <div className={css.root}>
      <Header />
      <main>
        <Container>
          <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route
                  path='/'
                  element={<MainPage />}
                />
                <Route
                  path='/character/:id'
                  element={<CharactePage />}
                />
                <Route
                  path='/404'
                  element={<NotFoundPage />}
                />
                <Route
                  path='*'
                  element={<Navigate to='/404' />}
                />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
