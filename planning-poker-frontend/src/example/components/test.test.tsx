import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FunctionalCard from './FunctialCard.tsx';

test('renders title and value', () => {
    render(<FunctionalCard title="Score" values="9" />);
    expect(screen.getByText('Score')).toBeInTheDocument();
    expect(screen.getByText('9')).toBeInTheDocument();
});
