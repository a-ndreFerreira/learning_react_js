import { describe, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PostCard from './PostCard';

import { mockPostCard } from './mockPostCard'

//mock de dados
const mock = mockPostCard;

describe('<PostCard />', () => {

    it('should image in screen', () => {
        render(<PostCard {...mock} />);

        //para ver se tem o documneto
        // expect(expectVar).toBeInTheDocument();

        expect(screen.getByRole('img', { name: 'title 13' }))
            .toHaveAttribute('src', 'img/img.png');

        expect(screen.getByRole('heading', { name: 'title 13 #1' }))
            .toBeInTheDocument();

        expect(screen.getByText('body')).toBeInTheDocument();

    })
})