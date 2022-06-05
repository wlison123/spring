const CracoLessPlugin = require("craco-less")
const path = require("path")

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { "@primary-color": "#1DA57A" },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  devServer: {
    port: 9000,
    proxy: {
      "/api": {
        target: "http://localhost:5222",
        changeOrigin: true,
        pathRewrite: {"^/api" : ""}
      }
    }
  }
}
