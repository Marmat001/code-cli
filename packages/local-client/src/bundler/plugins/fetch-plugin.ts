import * as esbuild from 'esbuild-wasm'
import axios from 'axios'
import localForage from 'localforage'

const cache = localForage.createInstance({
  name: 'cache',
})

export const fetchPlugin = (content: string) => {
  return {
    name: 'fetch-plugin',
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: content,
        }
      })

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const cachedInfo = await cache.getItem<esbuild.OnLoadResult>(args.path)

        if (cachedInfo) {
          return cachedInfo
        }
      })

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path)

        const filtered = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")

        const contents = `
            const style = document.createElement('style');
            style.innerText = '${filtered}';
            document.head.appendChild(style);
          `

        const response: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        }

        await cache.setItem(args.path, response)

        return response
      })

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path)

        const response: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        }

        await cache.setItem(args.path, response)

        return response
      })
    },
  }
}
