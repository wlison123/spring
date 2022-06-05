import React, { useState, useEffect, useMemo } from "react"
import { createForm } from "@formily/core"
import { createSchemaField } from "@formily/react"
import { Form, FormItem, FormLayout, Input, Select, Cascader, DatePicker, FormGrid, Upload, ArrayItems, Editable } from "@formily/antd"
import { action } from "@formily/reactive"

import { Modal, Space, Button, Spin, message, Table } from "antd"
import { UploadOutlined, ExclamationCircleOutlined } from "@ant-design/icons"
import requests from "@/utils/requests"
import "./index.less"

const { confirm } = Modal
const IDUpload = (props) => {
  return (
    <Upload
      {...props}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      headers={{
        authorization: "authorization-text"
      }}
    >
      <Button icon={<UploadOutlined />}>上传复印件</Button>
    </Upload>
  )
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormGrid,
    FormLayout,
    Input,
    DatePicker,
    Cascader,
    Select,
    IDUpload,
    ArrayItems,
    Editable
  },
  scope: {
    fetchAddress: (field) => {
      const transform = (data = {}) => {
        return Object.entries(data).reduce((buf, [key, value]) => {
          if (typeof value === "string")
            return buf.concat({
              label: value,
              value: key
            })
          const { name, code, cities, districts } = value
          const _cities = transform(cities)
          const _districts = transform(districts)
          return buf.concat({
            label: name,
            value: code,
            children: _cities.length ? _cities : _districts.length ? _districts : undefined
          })
        }, [])
      }

      field.loading = true
      fetch("//unpkg.com/china-location/dist/location.json")
        .then((res) => res.json())
        .then(
          action.bound((data) => {
            field.dataSource = transform(data)
            field.loading = false
          })
        )
    }
  }
})

const schema = {
  type: "object",
  properties: {
    username: {
      type: "string",
      title: "用户名",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input"
    },
    name: {
      type: "void",
      title: "姓名",
      "x-decorator": "FormItem",
      "x-decorator-props": {
        asterisk: true,
        feedbackLayout: "none"
      },
      "x-component": "FormGrid",
      properties: {
        firstName: {
          type: "string",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-component-props": {
            placeholder: "姓"
          }
        },
        lastName: {
          type: "string",
          required: true,
          "x-decorator": "FormItem",
          "x-component": "Input",
          "x-component-props": {
            placeholder: "名"
          }
        }
      }
    },
    email: {
      type: "string",
      title: "邮箱",
      required: true,
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-validator": "email"
    },
    birthday: {
      type: "string",
      required: true,
      title: "生日",
      "x-decorator": "FormItem",
      "x-component": "DatePicker"
    },
    gf: {
      type: "string",
      title: "女朋友",

      "x-decorator": "FormItem",
      "x-component": "Input"
    },
    gender: {
      type: "string",
      title: "性别",
      enum: [
        {
          label: "男",
          value: 1
        },
        {
          label: "女",
          value: 2
        },
        {
          label: "第三性别",
          value: 3
        }
      ],
      "x-decorator": "FormItem",
      "x-component": "Select"
    }
  }
}
export const PicutreManage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [list, setList] = useState([])
  const [pageIndex, setPageIndex] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [isEdit, setIsEdit] = useState(false)
  const form = useMemo(() => {
    return createForm()
  }, [])
  const add = () => {
    setIsEdit(false)
    setIsModalVisible(true)
  }

  const submit = () => {
    const data = form.values
    console.log("data", data)
    if (isEdit) {
      form
        .validate()
        .then(() => {
          requests.put(`/api/picture/${data.id}`, data).then((res) => {
            setIsModalVisible(false)
            message.success("操作成功")
            getList()
            form.reset()
          })
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      form
        .validate()
        .then(() => {
          requests.post("/api/picture", data).then((res) => {
            setIsModalVisible(false)
            message.success("添加成功")
            getList()
            form.reset()
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const onEdit = ({ id }) => {
    setIsEdit(true)
    requests.get(`/api/picture/${id}`).then((data) => {
      form.setValues(data)
      setIsModalVisible(true)
    })
  }
  const onDelete = (record) => {
    confirm({
      title: "确定删除吗?",
      icon: <ExclamationCircleOutlined />,
      content: "删除后不可恢复",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        requests.delete(`/api/picture/${record.id}`).then((res) => {
          getList()
        })
      },
      onCancel() {
        console.log("Cancel")
      }
    })
  }
  const [loading, setLoading] = useState(true)
  const getList = () => {
    setLoading(true)
    requests.get("/api/picture").then((res) => {
      setLoading(false)
      setList(res)
    })
  }
  useEffect(() => {
    getList()

    // setTimeout(() => {
    //   form.setInitialValues({
    //     username: "Aston Martin",
    //     firstName: "Aston",
    //     lastName: "Martin",
    //     email: "aston_martin@aston.com",
    //     gender: 1,
    //     birthday: "1836-01-03",
    //     address: ["110000", "110000", "110101"],
    //     idCard: [
    //       {
    //         name: "this is image",
    //         thumbUrl: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //         uid: "rc-upload-1615825692847-2",
    //         url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
    //       }
    //     ],
    //     contacts: [
    //       { name: "张三", phone: "13245633378", email: "zhangsan@gmail.com" },
    //       { name: "李四", phone: "16873452678", email: "lisi@gmail.com" }
    //     ]
    //   })
    //   setLoading(false)
    // }, 1000)
  }, [])
  const columns = [
    {
      title: "id",
      dataIndex: "id"
    },
    {
      title: "姓名",
      dataIndex: "username"
    },
    {
      title: "email",
      dataIndex: "email"
    },
    {
      title: "性别",
      dataIndex: "gender",
      render: (g) => (g === 1 ? "男" : "女")
    },
    {
      title: "操作",
      render: (r) => (
        <Space>
          <span className="delete-btn" onClick={onDelete.bind(null, r)}>
            删除
          </span>
          <span className="edit-btn" onClick={onEdit.bind(null, r)}>
            编辑
          </span>
        </Space>
      )
    }
  ]
  return (
    <div className="pciture-manage">
      <Spin spinning={loading}>
        <Button type="primary" onClick={add}>
          新增
        </Button>
        <Table rowKey={"id"} columns={columns} dataSource={list}></Table>
        <Modal width={600} title={isEdit ? "编辑" : "新增"} visible={isModalVisible} onOk={submit} onCancel={handleCancel}>
          <Form form={form} labelCol={5} wrapperCol={16}>
            <SchemaField schema={schema} />
          </Form>
        </Modal>
      </Spin>
    </div>
  )
}
