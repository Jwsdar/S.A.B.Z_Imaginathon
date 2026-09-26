// @vitest-environment jsdom
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import '@testing-library/jest-dom/vitest';
import UserDashboard from './UserDashboard';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }) => <div>{children}</div>,
  BarChart: () => <div>BarChart</div>,
  Bar: () => <div>Bar</div>,
  XAxis: () => <div>XAxis</div>,
  Tooltip: () => <div>Tooltip</div>,
}));

// Mock the scanner with the full dataset
vi.mock('@yudiel/react-qr-scanner', () => ({
  Scanner: ({ onScan }) => (
    <div data-testid="mock-scanner">
      <button onClick={() => onScan([{ rawValue: JSON.stringify({ system: "SABZ", hub_id: "demo_hub_01", weight_kg: 4.0, credits_earned: 120, waste_type: "organic" }) }])}>
        Simulate QR Scan
      </button>
    </div>
  )
}));

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
});

describe('UserDashboard Component', () => {
  
  it('redirects to login if no user ID is found in localStorage', () => {
    render(<UserDashboard />);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('renders dashboard and keeps record button disabled initially', () => {
    localStorage.setItem('sabz_user_id', 'user_9982');
    render(<UserDashboard />);
    
    const recordBtn = screen.getByRole('button', { name: /Scan QR to Record/i });
    expect(recordBtn).toBeDisabled();
  });

  it('parses QR payload, maps location, and updates the action button', () => {
    localStorage.setItem('sabz_user_id', 'user_9982');
    render(<UserDashboard />);
    
    // Simulate the camera reading the QR code
    fireEvent.click(screen.getByText('Simulate QR Scan'));
    
    // Check that the parsed data rendered inside the scanner box
    expect(screen.getByText('Scan Successful')).toBeInTheDocument();
    expect(screen.getByText('DEMO_HUB_01')).toBeInTheDocument();
    expect(screen.getByText('Furniture Market, Chiniot')).toBeInTheDocument();
    expect(screen.getByText('4.0 kg')).toBeInTheDocument();
    expect(screen.getByText('+120')).toBeInTheDocument();
    
    // Ensure the button text updated and is enabled
    const recordBtn = screen.getByRole('button', { name: /Record 4kg Deposit/i });
    expect(recordBtn).not.toBeDisabled();
  });
});