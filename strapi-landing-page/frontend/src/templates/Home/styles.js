import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
    ${({ theme }) => css`
        background-color: ${theme.colors.light}
    `
    }

`;