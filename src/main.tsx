
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add global styles for ElevenLabs widget
const style = document.createElement('style');
style.textContent = `
  elevenlabs-convai::part(cta) {
    display: none !important;
  }
`;
document.head.appendChild(style);

// Add favicon link
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.href = '/logo.svg';
favicon.type = 'image/svg+xml';
document.head.appendChild(favicon);

createRoot(document.getElementById("root")!).render(<App />);
