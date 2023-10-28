/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts", "api.tsx", ".tsx"],

  // basePath: "/front-horsys",
  reactStrictMode: false,

  images: {
    domains: ["homologacao.seap.ma.gov.br", "siisp.ma.gov.br"],
  },

  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
