import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import { vi } from "vitest";
import { describe, expect } from "vitest";
import Button from "./Button";

describe('<Button />', () => {
    it('should render the button with the text', () => {
        render(<Button text='Load More Posts' />);
        expect.assertions(1);

        const button = screen.getByRole('button', { name: /Load More Posts/i })

        // expect(button).toHaveAttribute('class', 'buttonClass');
        expect(button).toBeInTheDocument();
    })

    it('should call function on button click', async () => {

        //funcao mock do vitest
        const fn = vi.fn();
        render(<Button text='Load More Posts' onClick={fn} />);

        const button = screen.getByRole('button', { name: /Load More Posts/i });

        await userEvent.click(button);
        // fireEvent.click(button);

        //segundo click
        // fireEvent.click(button);

        //se foi chamada, independente das vezes
        // expect(fn).toHaveBeenCalled();

        //se foi chamada pelo numero de vezes setado
        expect(fn).toHaveBeenCalledTimes(1);

    })

    it('should be enabled when disabled is false', () => {
        render(<Button text='Load More Posts' disabled={false} />);

        const button = screen.getByRole('button', { name: /Load More Posts/i });

        //toBeDisabeled para ver se esta desativado, e toBeEnabled para ver se esta ativado
        expect(button).toBeEnabled();

    })
})