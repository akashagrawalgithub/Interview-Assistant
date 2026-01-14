import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                terms: resolve(__dirname, 'terms.html'),
                privacy: resolve(__dirname, 'privacy.html'),
                refund: resolve(__dirname, 'refund.html'),
                'cluely-alternative': resolve(__dirname, 'cluely-alternative.html'),
                'parakeet-ai-vs-interviewassistant': resolve(__dirname, 'parakeet-ai-vs-interviewassistant.html'),
                'interview-coder-alternative': resolve(__dirname, 'interview-coder-alternative.html'),
                'best-ai-coding-copilot': resolve(__dirname, 'best-ai-coding-copilot.html'),
            },
        },
    },
});
