import { forwardRef, useState, useEffect, HTMLAttributes } from 'react';

const Div100vh = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ style, ...other }, ref) => {
        const height = use100vh();

        const styleWithRealHeight = {
            ...style,
            height: height ? `${height}px` : '100vh',
        };
        return <div ref={ref} style={styleWithRealHeight} {...other} />;
    },
);

Div100vh.displayName = 'Div100vh';

export default Div100vh;

export function use100vh(): number | null {
    const [height, setHeight] = useState<number | null>(measureHeight);

    const wasRenderedOnClientAtLeastOnce = useWasRenderedOnClientAtLeastOnce();

    useEffect(() => {
        if (!wasRenderedOnClientAtLeastOnce) return;

        function setMeasuredHeight() {
            const measuredHeight = measureHeight();
            setHeight(measuredHeight);
        }

        window.addEventListener('resize', setMeasuredHeight);
        return () => window.removeEventListener('resize', setMeasuredHeight);
    }, [wasRenderedOnClientAtLeastOnce]);
    return wasRenderedOnClientAtLeastOnce ? height : null;
}

export function measureHeight(): number | null {
    if (!isClient()) return null;
    return document.documentElement?.clientHeight || window.innerHeight;
}

function useWasRenderedOnClientAtLeastOnce() {
    const [wasRenderedOnClientAtLeastOnce, setWasRenderedOnClientAtLeastOnce] = useState(false);

    useEffect(() => {
        if (isClient()) {
            setWasRenderedOnClientAtLeastOnce(true);
        }
    }, []);
    return wasRenderedOnClientAtLeastOnce;
}

function isClient() {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
}
