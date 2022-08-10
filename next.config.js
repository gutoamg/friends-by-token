/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ['ipfs.pixura.io'],
		minimumCacheTTL: 300,
	},
}

module.exports = nextConfig
