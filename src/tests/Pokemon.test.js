import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  const pikachu = pokemons.find((pokemon) => pokemon.name === 'Pikachu');
  const { name, type, averageWeight, image, id } = pikachu;
  const { value, measurementUnit } = averageWeight;
  renderWithRouter(<App />);

  it('É renderizado um card com as informações de determinado pokémon.', () => {
    const pkmName = screen.getByTestId('pokemon-name');
    const pkmType = screen.getByTestId('pokemon-type');
    const pkmWeight = screen.getByTestId('pokemon-weight');
    const pkmImg = screen.getByAltText(`${name} sprite`);

    expect(pkmName).toHaveTextContent(name);
    expect(pkmType).toHaveTextContent(type);
    expect(pkmWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(pkmImg).toHaveAttribute('src', image);
  });

  it('Contém um link de navegação de detalhes do pokemon funcional', () => {
    const { history } = renderWithRouter(<App />);
    const detailsBtn = screen.getByRole('link', { name: /more details/i });

    userEvent.click(detailsBtn);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('O Pokémon favoritado contém o esperado', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite />);

    const favImg = screen.getByAltText(`${name} is marked as favorite`);

    expect(favImg).toHaveAttribute('src', '/star-icon.svg');
  });
});
