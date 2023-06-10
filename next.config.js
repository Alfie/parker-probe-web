/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer, dev }) {
        // Use the client static directory in the server bundle and prod mode
        // Fixes `Error occurred prerendering page "/"`
       /* config.output.webassemblyModuleFilename =
          isServer && !dev
            ? '../static/[modulehash].wasm'
            : 'static/[modulehash].wasm'*/
    
        // Since Webpack 5 doesn't enable WebAssembly by default, we should do it manually
        config.experiments = { ...config.experiments, asyncWebAssembly: true }
    
        return config
      },
}

module.exports = nextConfig
