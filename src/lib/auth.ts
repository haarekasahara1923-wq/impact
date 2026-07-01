import crypto from 'crypto';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET_KEY = process.env.JWT_SECRET || 'impact-institute-super-secret-key-2026';
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_KEY);

/**
 * Hashes a plain-text password using PBKDF2.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
}

/**
 * Verifies a plain-text password against a stored hashed password.
 */
export function verifyPassword(password: string, stored: string): boolean {
  if (!stored || !stored.includes(':')) return false;
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const checkHash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
  return hash === checkHash;
}

/**
 * Signs a JWT token with the user details.
 */
export async function signToken(payload: {
  id: number;
  email: string;
  name: string;
  class?: string;
  role: 'student' | 'admin';
}) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(JWT_SECRET);
}

/**
 * Verifies a JWT token and returns its payload if valid.
 */
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Sets the auth cookie with the given JWT token.
 */
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 2, // 2 hours
    path: '/',
  });
}

/**
 * Retrieves the token from the request cookies.
 */
export async function getAuthToken() {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
}

/**
 * Verifies the current session based on the auth cookie.
 */
export async function getSession() {
  const token = await getAuthToken();
  if (!token) return null;
  return await verifyToken(token);
}

/**
 * Removes the auth cookie.
 */
export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0, // Expire immediately
    path: '/',
  });
}
