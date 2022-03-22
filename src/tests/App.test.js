import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    const favLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favLink).toBeInTheDocument();
  });

  it('Ao clicar no link correto, é redireciona para a página /', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Ao clicar no link correto, é redireciona para a página /about', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Ao clicar no link correto, é redireciona para a página /favorites', () => {
    const { history } = renderWithRouter(<App />);

    const favLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favLink).toBeInTheDocument();
    userEvent.click(favLink);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('A aplicação é redirecionada a Not Found quando entrar em URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/xablau/naoexiste');

    const notFounText = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFounText).toBeInTheDocument();
  });
});
