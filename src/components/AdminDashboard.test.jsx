// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import AdminDashboard from './AdminDashboard';

// This wipes the virtual DOM clean after every single test
afterEach(() => {
  cleanup();
});

// Mock Recharts and React-Leaflet to avoid DOM measuring errors during testing
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  AreaChart: () => <div>AreaChart</div>,
  Area: () => <div>Area</div>,
  BarChart: () => <div>BarChart</div>,
  Bar: () => <div>Bar</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  Tooltip: () => <div>Tooltip</div>,
}));

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div>{children}</div>,
  TileLayer: () => <div>TileLayer</div>,
  Marker: ({ children, eventHandlers }) => (
    <div data-testid="mock-marker" onClick={eventHandlers.click}>
      {children}
    </div>
  ),
  Popup: ({ children }) => <div>{children}</div>,
}));

describe('AdminDashboard Component', () => {
  it('renders the sidebar and initial City Overview data', () => {
    render(<AdminDashboard />);
    
    // Check Sidebar
    expect(screen.getByText('S.A.B.Z Admin')).toBeInTheDocument();
    
    // Check Main Content headers
    expect(screen.getByText('Chiniot City Overview')).toBeInTheDocument();
    expect(screen.getByText('Measure waste collection and green credit distribution.')).toBeInTheDocument();
    
    // Check Metric Cards exist
    expect(screen.getByText('Waste Collected (kg)')).toBeInTheDocument();
    expect(screen.getByText('124.5K')).toBeInTheDocument(); // Overall waste
  });

  it('updates data when a map marker is clicked and can reset', () => {
    render(<AdminDashboard />);
    
    // Find all mocked markers and click the first one (Furniture Market Hub)
    const markers = screen.getAllByTestId('mock-marker');
    fireEvent.click(markers[0]);

    // Use getAllByText because the text exists in both the Header and the Map Popup
    expect(screen.getAllByText('Furniture Market Hub')[0]).toBeInTheDocument();
    
    // The metric should update to the hub's specific waste amount
    expect(screen.getByText('42.1K')).toBeInTheDocument();

    // Click the reset button
    const resetButton = screen.getByText('Reset to City View');
    fireEvent.click(resetButton);

    // It should be back to the overall overview
    expect(screen.getByText('Chiniot City Overview')).toBeInTheDocument();
    expect(screen.getByText('124.5K')).toBeInTheDocument();
  });
});