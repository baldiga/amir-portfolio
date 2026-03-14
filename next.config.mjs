/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'amirbaldiga.com' },
      { protocol: 'https', hostname: 'www.amirbaldiga.com' },
    ],
  },
  async redirects() {
    return [
      // /build/[slug] → /magazine/[slug] (keeps old internal links working)
      { source: '/build/mila-ai-whatsapp-bot',      destination: '/magazine/mila-ai-whatsapp-bot',      permanent: true },
      { source: '/build/twitter-ai-lead-hunter',    destination: '/magazine/twitter-ai-lead-hunter',    permanent: true },
      { source: '/build/ai-sdr-agent-manus',        destination: '/magazine/ai-sdr-agent-manus',        permanent: true },
      { source: '/build/openclaw-vs-manus-ai',      destination: '/magazine/openclaw-vs-manus-ai',      permanent: true },
      { source: '/build/build-vs-buy-ai-marketing', destination: '/magazine/build-vs-buy-ai-marketing', permanent: true },
      { source: '/build/ai-agent-10-minutes',       destination: '/magazine/ai-agent-10-minutes',       permanent: true },
      { source: '/build/linkedin-formatter-tool',   destination: '/magazine/linkedin-formatter-tool',   permanent: true },

      // WordPress slug redirects (ready for domain migration)
      { source: '/millaai',           destination: '/magazine/mila-ai-whatsapp-bot',      permanent: true },
      { source: '/xaibot',            destination: '/magazine/twitter-ai-lead-hunter',    permanent: true },
      { source: '/manusvsopenclaw',   destination: '/magazine/openclaw-vs-manus-ai',      permanent: true },
      { source: '/aiagents',          destination: '/magazine/ai-agent-10-minutes',       permanent: true },
      { source: '/linkedinformatter', destination: '/magazine/linkedin-formatter-tool',   permanent: true },
      { source: '/magazin',           destination: '/magazine',                           permanent: true },
      { source: '/magazin/',          destination: '/magazine',                           permanent: true },
    ];
  },
};

export default nextConfig;
