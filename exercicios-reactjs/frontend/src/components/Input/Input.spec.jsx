import { describe, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import Input from "./Input";

describe('<Input />', () => {
    it('should be render all the props an component INPUT in screen', () => {
        const fn = vi.fn();
        render(<Input onChange={fn} searchValue='title' placeholder='placeholder' />);

        expect(within(screen.getByRole('group')).getByText('Buscar')).toBeInTheDocument();

    })

    it('should be value input in the searchValue', () => {
        const fn = vi.fn();
        render(<Input onChange={fn} searchValue='title' placeholder='placeholder' />);

        const input = screen.getByPlaceholderText('placeholder');

        expect(input.value).toBe('title');
    })

    it('should call onChange on each key pressed', async () => {
        const fn = vi.fn();
        render(<Input onChange={fn} placeholder='placeholder' />);

        const input = screen.getByPlaceholderText('placeholder');

        const value = 'o valor';

        await userEvent.type(input, value);

        expect(input.value).toBe(value);
        expect(fn).toHaveBeenCalledTimes(value.length);

    })

    it('should match snapshot', () => {
        const { container } = render(<Input />);

        expect(container).toMatchSnapshot();
    })

})