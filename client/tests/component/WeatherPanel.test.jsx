import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import WeatherPanel from '../../src/components/UI/WeatherPanel'

// --- MOCK DATA ---
const mockCanton_1 = {
    id: 1,
    name: 'Liberia',
    province: 'Guanacaste',
    lat: 10.634,
    lon: -85.440,
    temp: 36
}

const mockCanton_2 = {
    id: 6,  
    name: 'San José',     
    province: 'San José', 
    lat: 9.935,  
    lon: -84.084, 
    temp: 22
}

const onSelect = vi.fn();

describe('WeatherPanel', () => {
    afterEach(() => {
        cleanup();
    });

    it('renders default state when no canton is selected', () => {
        render(
            <WeatherPanel
                onSelect={onSelect}
            />
        );

        expect(document.querySelector('.panel-wrapper')).toBeInTheDocument();
    });

    // Check if this test is valid
    it('does not have selection-made class when no canton is selected', () => {
        render(
            <WeatherPanel
                onSelect={onSelect}
            />
        );

        expect(document.querySelector('.panel-wrapper.slection-made')).not.toBeInTheDocument();
    });

    it('renders the canton name when a canton is selected', () => {

    });

    it('renders the canton temperature when a canton is selected', () => {
        
    });

    it('adds selection-made class when a canton is selected', () => {
        
    });

    it('updates when a different canton is selected', () => {
        
    });
});
