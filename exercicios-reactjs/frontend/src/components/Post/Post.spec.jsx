import { render, screen } from '@testing-library/react'
import { describe, expect } from 'vitest'

import Post from './Post'

const posts = {
    posts: [
        {
            title: 'title 1',
            body: 'body 1',
            id: 1,
            cover: 'img/img1.png'
        },
        {
            title: 'title 2',
            body: 'body 2',
            id: 2,
            cover: 'img/img2.png'
        },
        {
            title: 'title 3',
            body: 'body 3',
            id: 3,
            cover: 'img/img3.png'
        },
    ]
};

describe('<Post />', () => {
    it('should be render all the props an component in screen', () => {
        // const { debug } = render(<Post {...posts} />);

        // debug();

        render(<Post {...posts} />);

        expect(screen.getAllByRole('heading', { name: /title/i })).toHaveLength(3);

        expect(screen.getAllByRole('img', { name: /title/i })).toHaveLength(3);

        expect(screen.getAllByText(/body/i)).toHaveLength(3);

        expect(screen.getByRole('img', { name: 'title 3' })).toHaveAttribute('src', 'img/img3.png');

    })

    it('should match snapshot', () => {
        const { container } = render(<Post {...posts} />);

        expect(container.firstChildren).toMatchSnapshot();
    })

})