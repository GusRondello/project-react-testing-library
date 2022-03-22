import { screen } from '@testing-library/react';
import React from 'react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <About.js />.', () => {
  it('Teste se a página contém as informações sobre a Pokédex em 2 paragráfos', () => {
    renderWithRouter(<About />);

    const aboutTextOne = screen.getByText(/This application /i);
    const aboutTextTwo = screen.getByText(/One can filter Pokémons /i);

    expect(aboutTextOne).toBeInTheDocument();
    expect(aboutTextTwo).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutHeading = screen.getByRole('heading', { name: /about pokédex/i });
    expect(aboutHeading).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem correta de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgRole = screen.getByRole('img', { src: imgUrl });
    expect(imgRole).toHaveAttribute('src', imgUrl);
  });
});
