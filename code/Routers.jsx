import { useRoutes } from "react-router-dom"
import { LinkManage } from "./pages/linkManage"
import { PicutreManage } from "./pages/pictureManage"

const routes = [
  {
    path: "/web/linkManage",
    element: <LinkManage></LinkManage>
  },
  {
    path: "/web/picutreManage",
    element: <PicutreManage></PicutreManage>
  }
]

export const Routers = () =>useRoutes(routes)
