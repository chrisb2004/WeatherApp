// @vitest-environment jsdom
// Forces Vitest to use jsdom as the DOM environment for this specific file,
// giving us access to document, window, and other browser APIs that React needs to render

import { render, screen, cleanup, fireEvent } from '@testing-library/react'
// render   → mounts a React component into the fake jsdom DOM
// screen   → provides query methods to find elements in the rendered output
// cleanup  → unmounts the component and clears the DOM after each test
// fireEvent → simulates DOM events like clicks directly on elements

import { describe, it, expect, afterEach, vi } from 'vitest'
// describe  → groups related tests under a named block
// it        → defines a single test case
// expect    → makes assertions about values
// afterEach → registers a function that runs after every test
// vi        → Vitest's utility object for creating mocks and fake functions

import CityMarker from '../../src/components/map/CityMarker'
// imports the actual component we are testing
// path goes up two levels from tests/component/ to client/ then down into src/

// --- MOCKS ---
// We mock both react-leaflet and leaflet because they require a real browser
// and a real map context to work. jsdom cannot provide that, so we replace
// them with fake versions that behave the same way but work in a test environment

vi.mock('react-leaflet', () => ({
  // replaces the entire react-leaflet module with a fake version
  Marker: ({ children, eventHandlers }) => (
    // replaces the real Marker component which needs a Leaflet map context
    // with a plain div that works in jsdom
    <div
      data-testid="marker"
      // data-testid lets us find this element in the DOM using screen.getByTestId()
      onClick={eventHandlers?.click}
      // maps Leaflet's eventHandlers.click to a standard DOM onClick
      // so fireEvent.click() correctly triggers the handler
      // ?. is optional chaining — safely accesses .click without crashing
      // if eventHandlers is undefined
    >
      {children}
    </div>
  )
}))

vi.mock('leaflet', () => ({
  // replaces the entire leaflet library with a fake version
  default: {
    divIcon: vi.fn(() => ({})),
    // replaces L.divIcon() with a mock function that returns an empty object
    // vi.fn() records how many times the function was called and with what arguments
    // returns {} because useMemo just needs something to store — the actual
    // icon object is never used in a jsdom environment
  }
}))

vi.mock('react-leaflet', () => ({
  Marker: ({ children, eventHandlers, position }) => (
    <div
      data-testid="marker"
      data-lat={position[0]}
      data-lon={position[1]}
      onClick={eventHandlers?.click}
    >
      {children}
    </div>
  )
}))

// --- MOCK DATA ---
const mockCanton = {
  // a fake canton object that mirrors the exact shape of a real canton from cantones.js
  // defined outside the test so it can be reused across multiple tests
  id: 1,
  name: 'Liberia',
  province: 'Guanacaste',
  lat: 10.634,
  lon: -85.440,
  temp: 36
}

// --- LIFECYCLE ---
afterEach(() => {
  // runs automatically after every individual test in this file
  cleanup()
  // unmounts any React components rendered during the previous test
  // and removes them from the jsdom DOM
  // without this, components accumulate across tests and cause interference
})

// --- TESTS ---
describe('CityMarker', () => {
  it('renders without crashing', () => {
    render(
      <CityMarker
        canton={mockCanton}
        isSelected={false}
        onSelect={vi.fn()}
      />
    )

    expect(screen.getByTestId('marker')).toBeInTheDocument()
  });
  // groups all CityMarker tests together in the terminal output
  // making it easy to identify which component a failing test belongs to

  it('calls onSelect when clicked', () => {
    // describes exactly what behavior is being verified in plain English
    // reads as a sentence: CityMarker calls onSelect when clicked

    const onSelect = vi.fn();
    // creates a mock function that records whether it was called,
    // how many times, and with what arguments
    // replaces the real onSelect prop that would normally come from Header.jsx

    render(
      // mounts the component into the fake jsdom DOM with the required props
      <CityMarker
        canton={mockCanton}   // passes the fake canton data
        isSelected={false}    // sets the initial state to unselected
        onSelect={onSelect}   // passes the mock function so we can verify it gets called
      />
    )

    fireEvent.click(screen.getByTestId('marker'))
    // screen.getByTestId('marker') → finds the element with data-testid="marker" in the DOM
    // fireEvent.click()            → fires a click event on that element
    // together they simulate a user clicking the pin on the map

    expect(onSelect).toHaveBeenCalledOnce();
    // the assertion — verifies that the mock onSelect function was called exactly once
    // as a result of the click
    // if onSelect was never called or called more than once, the test fails
  });

  it('doesnt call onSelect when not clicked', () => {
    const onSelect = vi.fn()

    render(
      <CityMarker
        canton={mockCanton}
        isSelected={false}
        onSelect={onSelect}
      />
    );
    
    expect(onSelect).not.toHaveBeenCalled();
  });

  it('onSelect is called twice when marker is clicked twice', () => {
    const onSelect = vi.fn();
    
    render(
      <CityMarker
        canton={mockCanton}   
        isSelected={false}    
        onSelect={onSelect}   
      />
    )

    fireEvent.click(screen.getByTestId('marker'))
    fireEvent.click(screen.getByTestId('marker'))
    expect(onSelect).toHaveBeenCalledTimes(2);
  });

  it('renders at the correct canton coordinates', () => {
    render(
      <CityMarker
        canton={mockCanton}
        isSelected={false}
        onSelect={vi.fn()}
      />
    )
    const marker = screen.getByTestId('marker')
    expect(marker).toHaveAttribute('data-lat', '10.634')
    expect(marker).toHaveAttribute('data-lon', '-85.44')
  })
})