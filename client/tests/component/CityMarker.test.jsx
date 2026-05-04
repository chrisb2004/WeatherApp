// @vitest-environment jsdom
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import CityMarker from '../../src/components/map/CityMarker'

vi.mock('react-leaflet', () => ({
  Marker: ({ children, eventHandlers }) => (
    <div
      data-testid="marker"
      onClick={eventHandlers?.click}
    >
      {children}
    </div>
  )
}))

vi.mock('leaflet', () => ({
  default: {
    divIcon: vi.fn(() => ({})),
  }
}))

const mockCanton = {
  id: 1,
  name: 'Liberia',
  province: 'Guanacaste',
  lat: 10.634,
  lon: -85.440,
  temp: 36
}

afterEach(() => {
  cleanup()
})

describe('CityMarker', () => {
  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn()

    render(
      <CityMarker
        canton={mockCanton}
        isSelected={false}
        onSelect={onSelect}
      />
    )

    fireEvent.click(screen.getByTestId('marker'))
    expect(onSelect).toHaveBeenCalledOnce()
  })
})