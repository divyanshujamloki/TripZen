import { NextRequest } from 'next/server';
import { getUserById } from './mockStore';

export function getTokenFromRequest(req: NextRequest): string | null {
  const auth = req.headers.get('authorization');
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

export function getUserFromToken(token: string | null) {
  if (!token) return null;
  // Mock: token format is "mock-token-{userId}"
  const match = token.match(/^mock-token-(.+)$/);
  if (!match) {
    // Legacy mock tokens
    if (token === 'mock-jwt-token') return getUserById('user-1');
    if (token.includes('admin')) return getUserById('admin-1');
    return getUserById('user-1');
  }
  return getUserById(match[1]);
}

export function requireAuth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  const user = getUserFromToken(token);
  if (!user) return null;
  return user;
}

export function requireAdmin(req: NextRequest) {
  const user = requireAuth(req);
  if (!user || user.role !== 'admin') return null;
  return user;
}

export function createMockToken(userId: string): string {
  return `mock-token-${userId}`;
}
