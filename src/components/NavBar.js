"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const { isAuthenticated, user, logout, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user.email}!</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </>
      )}
    </nav>
  );
}
