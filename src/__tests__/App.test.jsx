import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App routing and rendering', () => {
  it('renders the home page on root path', () => {
    render(<App />)

    expect(
      screen.getByText(/powerful url shortening made simple/i)
    ).toBeInTheDocument()
  })
})
