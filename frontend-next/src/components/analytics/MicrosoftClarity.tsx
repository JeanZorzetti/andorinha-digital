'use client';

import { useEffect } from 'react';
import { clarity } from 'react-microsoft-clarity';

export default function MicrosoftClarity({ projectId }: { projectId: string }) {
    useEffect(() => {
        if (projectId) {
            clarity.init(projectId);
        }
    }, [projectId]);

    return null;
}
