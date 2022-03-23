import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  it('A página contém um heading h2 com o texto Encountered pokémons.', () => {
    renderWithRouter(<App />);

    const heading = screen.getByRole('heading', { name: /encountered pokémons/i });

    expect(heading).toBeInTheDocument();
  });

  it('O botão Próximo Pokemon corresponde ao esperado', () => {
    renderWithRouter(<App />);

    const nextBtn = screen.getByTestId('next-pokemon');

    expect(nextBtn).toHaveTextContent(/Próximo pokémon/i);
  });

  it('É mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pikachuOnScreen = screen.getByTestId('pokemon-name');

    expect(pikachuOnScreen).toHaveTextContent(/pikachu/i);
  });

  it('A Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);

    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByRole('button', { name: /all/i });

    expect(allBtn).toBeInTheDocument();
    expect(typeBtn[0]).toHaveTextContent(/electric/i);
    expect(typeBtn[1]).toHaveTextContent(/fire/i);
    expect(typeBtn[2]).toHaveTextContent(/bug/i);
    expect(typeBtn[3]).toHaveTextContent(/poison/i);
    expect(typeBtn[4]).toHaveTextContent(/psychic/i);
    expect(typeBtn[5]).toHaveTextContent(/normal/i);
    expect(typeBtn[6]).toHaveTextContent(/dragon/i);
  });

  it('Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    const pikachuOnScreen = screen.getByTestId('pokemon-name');

    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    expect(pikachuOnScreen).toBeInTheDocument();
  });
});
