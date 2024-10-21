import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from './app/store';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { HashRouter } from 'react-router-dom';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);

  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <HashRouter>{children}</HashRouter>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
