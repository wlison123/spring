import { useState } from "react"
import { Layout, Menu } from "antd"

import { AppstoreOutlined, MailOutlined, SettingOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
const { Sider } = Layout

const items = [
  {
    label: "网站配置",
    key: "web",
    icon: <SettingOutlined />,
    children: [
      {
        label: "链接管理",
        key: "/web/linkManage",
        icon: <MailOutlined />
      },
      {
        label: "图片管理",
        key: "/web/picutreManage",
        icon: <AppstoreOutlined />
      }
    ]
  }
]

export const SiderMenus = () => {
 const navigate= useNavigate()
  const clickMenus = ({ key }) => {
    console.log(key)
    navigate(key)
  }
  return (
    <Sider width={255} theme={"light"}>
      <Menu
        onClick={clickMenus}
        mode="inline"
        style={{
          width: 256
        }}
        items={items}
      />
    </Sider>
  )
}
