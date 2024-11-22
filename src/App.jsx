import { Col, Row, Table, Modal, Button, Form, Input, Popconfirm } from "antd"
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";


function App() {
  const [data, setData] = useState([])
  const [form] = Form.useForm()
  const [formUpdate, setFormUpdate] = useState(false)

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'LastName',
      dataIndex: 'lastname',
      key: 'lastname',
    },
    {
      title: 'Password',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (isActiveValue) => {
        return isActiveValue ? 'activo' : 'inactivo'
      }
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render:(text)=>{
        return text.slice(0,10)
      }
    },
    {
      title: 'Options',
      dataIndex: 'update',
      key: 'update',
      render: (text, value) => {
        return (
          <>

            <Button className="bg-cyan-400 mr-3" onClick={() => showModalEdit(value.id)}>Edit</Button>
            <Popconfirm
              title="Delete the User"
              description="Are you sure to delete this User?"
              okText="Yes"
              cancelText="No"
              onConfirm={()=>confirm(value.id)}
            >
              <Button danger>Delete</Button>
            </Popconfirm>


          </>
        )
      }
    },
  ];

  const getData = async () => {
    let response = await axios.get('http://localhost:3000/users')
    // const newDate = response.data.map(item =>{
    //   item.key = item.id
    //   return item
    // })
    setData(response.data)
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setFormUpdate(false)
    form.resetFields()
    setIsModalOpen(true);
  };

  const showModalEdit = async (id) => {
    setFormUpdate(true)
    setIsModalOpen(true);
    let response = await axios.get(`http://localhost:3000/users/${id}`)
    console.log(response.data)
    form.setFieldsValue(response.data)

  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const confirm = async (id) =>{
    let response = await axios.delete(`http://localhost:3000/users/${id}`)
    getData()
  }

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
    const idUser = values.id
    const { id, ...data } = values
    if (formUpdate) {
      let response = await axios.put(`http://localhost:3000/users/${idUser}`, data)
    } else {
      const response = await axios.post('http://localhost:3000/users', values)
    }
    form.resetFields()
    handleCancel()
    getData()
  }



  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <div className="flex justify-center p-4">
        <Button
          type="primary"
          onClick={showModal}
          className="w-full sm:w-auto"
        >
          Create User
        </Button>
      </div>

      <Modal
        title={formUpdate ? "Update User" : "Create User"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        className="max-w-lg mx-auto"
      >
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input type="text" placeholder="Name" className="w-full" />
          </Form.Item>

          <Form.Item
            name="lastname"
            rules={[
              {
                required: true,
                message: "Please input your lastname!",
              },
            ]}
          >
            <Input type="text" placeholder="Lastname" className="w-full" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input
              type="password"
              placeholder="Password"
              className="w-full"
            />
          </Form.Item>

          <Form.Item name="id" hidden>
            <Input type="text" />
          </Form.Item>

          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="w-full"
            >
              {formUpdate ? "Update" : "Create"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Row className="p-4">
        <Col xs={24} className="flex justify-center">
          <div className="w-full overflow-auto">
            <Table
              rowKey={"id"}
              dataSource={data}
              columns={columns}
              className="min-w-[320px] lg:min-w-[600px]"
            />
          </div>
        </Col>
      </Row>
    </>
  );
}

export default App
