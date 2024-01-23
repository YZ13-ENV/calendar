/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
			remotePatterns: [
					{
							protocol: 'https',
							hostname: '*'
					}
			]
	},
	experimental: {
			optimizeCss: true,
			optimizeServerReact: true
	}
}

module.exports = nextConfig