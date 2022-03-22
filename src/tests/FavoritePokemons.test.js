import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é a mensagem correta na tela se a pessoa não tiver pokemons favoritos',
    () => {
      renderWithRouter(<FavoritePokemons />);

      const noFavPkm = screen.getByText(/no favorite pokemon found/i);
      expect(noFavPkm).toBeInTheDocument();
    });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    const homeBtn = screen.getByRole('link', { name: /home/i });
    const nextPkmBtn = screen.getByTestId(/next-pokemon/i);
    const favLink = screen.getByRole('link', { name: /favorite pokémons/i });
    // const favPkm = screen.getAllByTestId(/pokemon-name/i);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    userEvent.click(detailsBtn);
    //  expect(pathname).toStrictEqual('/pokemon:25');
    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(favCheckbox);
    userEvent.click(homeBtn);
    expect(pathname).toBe('/');

    userEvent.click(nextPkmBtn);
    userEvent.click(detailsBtn);
    // expect(pathname).toBe('pokemon:4');

    userEvent.click(favCheckbox);
    userEvent.click(favLink);
    // expect(pathname).toBe('/favorites');

    // expect(favPkm).toBeInTheDocument();
    // expect(favPkm).toHaveTextContent(/pikachu/i);
    // expect(favPkm).toHaveTextContent(/charmander/i);
  });
});
