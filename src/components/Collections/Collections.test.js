import { render, screen } from '@testing-library/react'
import Collections from './Collections'

test('renders a collections div', () => {
  render(<Collections />)
  const collectionsDiv = screen.getByRole('navigation', { name: 'collections' })
  expect(collectionsDiv).toBeInTheDocument()
})
