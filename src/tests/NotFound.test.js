import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('A página contem o heading completo', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { name: /Page requested not found /i });

    expect(heading).toBeInTheDocument();
  });
  it('A página contem o gif', () => {
    renderWithRouter(<NotFound />);
    const gifUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgRole = screen.getByAltText(/Pikachu crying /i);

    expect(imgRole).toHaveAttribute('src', gifUrl);
  });
});
