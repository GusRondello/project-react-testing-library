import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  const pikachu = pokemons.find((pokemon) => pokemon.name === 'Pikachu');
  const { name, foundAt, id } = pikachu;

  it('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);

    const detailsBtn = screen.queryByRole('link', { name: /more details/i });
    const pokemonDetails = screen.getByRole('heading', { name: `${name} Details` });
    const summary = screen.getByRole('heading', { name: /summary/i });
    const about = screen.getByText(/This intelligent Pokémon/i);

    expect(detailsBtn).toBeNull();
    expect(pokemonDetails).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(about).toBeInTheDocument();
  });

  it('Existe na página uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(`/pokemons/${id}`);
      const locatinHeading = screen
        .getByRole('heading', { name: `Game Locations of ${name}` });
      const imgLocation = screen.getAllByAltText(`${name} location`);
      const textLocationOne = screen.getByText('Kanto Viridian Forest');
      const textLocationTwo = screen.getByText('Kanto Power Plant');

      expect(locatinHeading).toBeInTheDocument();
      expect(imgLocation[0]).toHaveAttribute('src', foundAt[0].map);
      expect(textLocationOne).toBeInTheDocument();
      expect(imgLocation[1]).toHaveAttribute('src', foundAt[1].map);
      expect(textLocationTwo).toBeInTheDocument();
    });

  it('O usuário pode favoritar um pokémon através da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(`/pokemons/${id}`);

    const favCheckbox = screen.getByLabelText('Pokémon favoritado?');

    userEvent.click(favCheckbox);
    expect(favCheckbox).toBeChecked();
  });
});
