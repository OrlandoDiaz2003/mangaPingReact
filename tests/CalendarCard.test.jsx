import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import CalendarCard from '../src/components/CalendarCard.jsx';
import useMangaFetch from '../src/hooks/useMangaInfo.jsx';

vi.mock('../src/hooks/useMangaInfo.jsx');

const mockedUseMangaFetch = useMangaFetch;

describe('Componente CalendarCard (con Vitest)', () => {

    beforeEach(() => {
        mockedUseMangaFetch.mockClear();
    });


    it('debería mostrar el mensaje "Cargando..." cuando loading es true', () => {
        mockedUseMangaFetch.mockReturnValue({
            data: null,
            loading: true,
            error: null
        });

        render(<CalendarCard />);

        expect(screen.getByText('Cargando mangas favoritos...')).toBeInTheDocument();
    });


    it('debería mostrar un mensaje de error si el hook devuelve un error', () => {
        mockedUseMangaFetch.mockReturnValue({
            data: null,
            loading: false,
            error: { message: 'No se pudo conectar' }
        });

        render(<CalendarCard />);

        expect(screen.getByText(/Error: No se pudo conectar/i)).toBeInTheDocument();
    });


    it('debería mostrar "No se encontraron mangas" si no hay mangas en curso', () => {
        const mockData = [
            { title: 'Manga Terminado', status: 'finished', banner: 'banner1.jpg' },
            { title: 'Manga Pausado', status: 'on_hold', banner: 'banner2.jpg' }
        ];
        
        mockedUseMangaFetch.mockReturnValue({
            data: mockData,
            loading: false,
            error: null
        });

        render(<CalendarCard />);

        expect(screen.getByText('No se encontraron mangas en curso para mostrar.')).toBeInTheDocument();
    });


    it('debería renderizar los mangas en curso y mostrar las fechas correctas', () => {
        const mockData = [
            { title: 'Manga A', status: 'current', banner: 'banner-a.jpg', nextRelease: '2025-11-10' },
            { title: 'Manga B', status: 'current', banner: 'banner-b.jpg', nextRelease: null, updatedAt: '2025-10-30T15:00:00Z' },
            { title: 'Manga C', status: 'current', banner: 'banner-c.jpg', nextRelease: null, updatedAt: null },
            { title: 'Manga D (Finished)', status: 'finished', banner: 'banner-d.jpg' },
            { title: 'Manga E', status: 'current', banner: 'banner-e.jpg', nextRelease: '2025-12-01' },
            { title: 'Manga F', status: 'current', banner: 'banner-f.jpg', nextRelease: '2025-12-05' }
        ];

        mockedUseMangaFetch.mockReturnValue({
            data: mockData,
            loading: false,
            error: null
        });

        render(<CalendarCard />);

        expect(screen.getByText('Manga A')).toBeInTheDocument();
        expect(screen.getByText('Manga B')).toBeInTheDocument();
        expect(screen.getByText('Manga C')).toBeInTheDocument();
        expect(screen.getByText('Manga E')).toBeInTheDocument();

        expect(screen.queryByText('Manga D (Finished)')).not.toBeInTheDocument();
        expect(screen.queryByText('Manga F')).not.toBeInTheDocument(); 

        expect(screen.getByText('2025-11-10')).toBeInTheDocument(); 
        expect(screen.getByText('2025-10-30')).toBeInTheDocument(); 
        expect(screen.getByText('2025-12-01')).toBeInTheDocument(); 
        

        expect(screen.getByText('Fecha no disponible')).toBeInTheDocument(); 
    });
    
});