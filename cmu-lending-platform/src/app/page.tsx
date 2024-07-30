'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/CMULending');
  }, [router]);

  return null; // Return null as the component will redirect immediately
}
