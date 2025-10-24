import { useState, useEffect } from 'react';

export function ImageWithFallback({ src, fallback: Fallback, ...props }) {
    const [error, setError] = useState(null);

    useEffect(() => {
        setError(null);
    }, [src]);

    if (error && Fallback) {
        return <Fallback />;
    }

    if (!src) {
        return <Fallback />;
    }

    return (
        <img
            src={src}
            onError={setError}
            {...props}
        />
    );
}