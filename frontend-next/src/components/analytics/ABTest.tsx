'use client';

import { useState, useEffect, ReactNode } from 'react';

interface ABTestProps {
    name: string;
    variantA: ReactNode;
    variantB: ReactNode;
}

export default function ABTest({ name, variantA, variantB }: ABTestProps) {
    const [variant, setVariant] = useState<'A' | 'B' | null>(null);

    useEffect(() => {
        // Simple client-side random assignment
        // In a real app, this should be consistent (e.g., stored in cookie/localStorage)
        const storedVariant = localStorage.getItem(`ab_test_${name}`);

        if (storedVariant === 'A' || storedVariant === 'B') {
            setVariant(storedVariant);
        } else {
            const newVariant = Math.random() < 0.5 ? 'A' : 'B';
            localStorage.setItem(`ab_test_${name}`, newVariant);
            setVariant(newVariant);
        }
    }, [name]);

    if (!variant) return null; // Or return a loading skeleton/default variant

    return <>{variant === 'A' ? variantA : variantB}</>;
}
