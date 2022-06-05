import { Layout } from "antd"
import { HashRouter } from "react-router-dom"
import {Routers} from "./Routers"
import { Header } from "./layouts/Header"
import { SiderMenus } from "./layouts/SiderMenus"
import "./App.less"

function App() {
  return (
    <HashRouter>
      <Layout className="app-content">
        <Header></Header>
        <Layout>
          <SiderMenus></SiderMenus>
          <div className="content">
            <Routers></Routers>
          </div>
        </Layout>
      </Layout>
    </HashRouter>
  )
}

export default App
