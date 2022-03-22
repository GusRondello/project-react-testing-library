import { screen } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <FavoritePokemons.js />', () => {
  it('Teste se é a mensagem correta na tela se a pessoa não tiver pokemons favoritos',
    () => {
      const pkmnArray = [];
      renderWithRouter(<FavoritePokemons pokemons={ pkmnArray } />);

      const noFavPkm = screen.getByText(/no favorite pokemon found/i);
      expect(noFavPkm).toBeInTheDocument();
    });
  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const pikachu = pokemons.find((pokemon) => pokemon.name === 'Pikachu');
    const charmander = pokemons.find((pokemon) => pokemon.name === 'Charmander');
    const pokeArray = [pikachu, charmander];
    renderWithRouter(<FavoritePokemons pokemons={ pokeArray } />);
    const favPkm = screen.getAllByTestId(/pokemon-name/i);
    expect(favPkm[0]).toHaveTextContent(/pikachu/i);
    expect(favPkm[1]).toHaveTextContent(/charmander/i);
  });
});
