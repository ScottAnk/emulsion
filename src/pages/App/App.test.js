import { render, screen } from '@testing-library/react'
import App from './App'

test('renders an image', () => {
  render(<App />)
  const imageElement = screen.getByRole('img')
  expect(imageElement).toBeInTheDocument()
})

test('renders preview navigator buttons', () => {
  render(<App />)
  const nextButton = screen.getByRole('button', { name: 'next' })
  const prevButton = screen.getByRole('button', { name: 'previous' })
  expect(nextButton).toBeInTheDocument()
  expect(prevButton).toBeInTheDocument()
})
