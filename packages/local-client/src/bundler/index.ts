import * as esbuild from 'esbuild-wasm'
import { unpkgPlugin } from './plugins/unpkg-plugin'
import { fetchPlugin } from './plugins/fetch-plugin'

let service: esbuild.Service

const bundleCode = async (unbundledCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
    })
  }

  try {
    const response = await service.build({
      entryPoints: ['index.js'],
      bundle: true,
      write: false,
      plugins: [unpkgPlugin(), fetchPlugin(unbundledCode)],
      define: {
        'process.env.NODE_ENV': '"production"',
        global: 'window',
      },

      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment',
    })
    return {
      code: response.outputFiles[0].text,
      error: '',
    }
  } catch (error) {
    return {
      code: '',
      error: error.message,
    }
  }
}

export default bundleCode
