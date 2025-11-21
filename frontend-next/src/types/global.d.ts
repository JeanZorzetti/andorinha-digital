export { };

declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js',
            targetId: string | Date,
            params?: {
                page_path?: string;
                event_category?: string;
                event_label?: string;
                value?: number;
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                [key: string]: any;
            }
        ) => void;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        dataLayer: any[];
    }
}
