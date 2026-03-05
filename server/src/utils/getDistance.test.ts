import { getDistance } from './getDistance';

describe('getDistance', () => {
  test('distance between same points is 0', () => {
    const p = { lat: 48.8566, lng: 2.3522 };
    expect(getDistance(p, p)).toBeCloseTo(0, 6);
  });

  test('distance between Paris and London ~343 km', () => {
    const paris = { lat: 48.8566, lng: 2.3522 };
    const london = { lat: 51.5074, lng: -0.1278 };
    const d = getDistance(paris, london);
    // Known approximate distance ~343 km
    expect(d).toBeGreaterThan(330);
    expect(d).toBeLessThan(360);
  });

  test('distance is symmetric', () => {
    const a = { lat: 40.7128, lng: -74.006 };
    const b = { lat: 34.0522, lng: -118.2437 };
    expect(getDistance(a, b)).toBeCloseTo(getDistance(b, a), 6);
  });
});
