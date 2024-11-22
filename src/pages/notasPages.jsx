import { Col, Row, Table, Modal, Button, Form, Input, Popconfirm, Select } from "antd"

import axios from "axios";
import { useEffect, useState } from "react";


const NotasPage = () => {
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])
    const [userId , setUserId] = useState(null)
    const [form] = Form.useForm()
    const [formUpdate, setFormUpdate] = useState(false)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nota',
            dataIndex: 'nota',
            key: 'nota',
        },
        {
            title: 'Name',
            dataIndex: 'User',
            key: 'User',
            render: (text) => {
                return text.name
            }
        },
        // {
        //     title: 'LastName',
        //     dataIndex: 'User',
        //     key: 'User',
        //     render: (text) => {
        //         return text.lastname
        //     }
        // },
        {
            title: 'Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => {
                return text.slice(0, 10)
            }
        },
        {
            title: 'Options',
            dataIndex: 'update',
            key: 'update',
            render: (text, value) => {
                return (
                    <>

                        <Button className="bg-green-500 mr-3" onClick={() => showModalEdit(value.id)}>Edit</Button>
                        <Popconfirm
                            title="Delete the User"
                            description="Are you sure to delete this User?"
                            okText="Yes"
                            cancelText="No"
                            onConfirm={() => confirm(value.id)}
                        >
                            <Button danger>Delete</Button>
                        </Popconfirm>


                    </>
                )
            }
        },
    ];

    const getData = async () => {
        let response = await axios.get('http://localhost:3000/notas')
        setData(response.data)
    }

    const getUsers = async () => {
        let response = await axios.get('http://localhost:3000/users')
        const datosMejorados = [...response.data]
        const datos = datosMejorados.map(item => ({value:item.id, label:item.name }));
     
        setUsers(datos)
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
        let response = await axios.get(`http://localhost:3000/notas/${id}`)
        const respuesta = response.data
        const datos = {nota:respuesta.nota, user_id:respuesta.User.id, id:respuesta.id};
        form.setFieldsValue(datos)

    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const confirm = async (id) => {
        let response = await axios.delete(`http://localhost:3000/notas/${id}`)
        getData()
    }

    const handleCancel = () => {
        form.resetFields()
        setIsModalOpen(false);
    };

    const onFinish = async (values) => {
        const { id, ...data } = values
  
        if (formUpdate) {
            let response = await axios.put(`http://localhost:3000/notas/${values.id}`, data)
        } else {
            const response = await axios.post('http://localhost:3000/notas', values)
        }
        form.resetFields()
        handleCancel()
        getData()
    }

    // const handleChange = (value) => {
    //     setUserId(value);
    //   };


    useEffect(() => {
        getData()
        getUsers()
    }, [])
    return (
        <>
            <div className="flex justify-center p-4">
                <Button type="primary" onClick={showModal} className="w-full sm:w-auto">
                    Create Note
                </Button>
            </div>

            <Modal
                title={formUpdate ? 'Update Client' : 'Create Client'}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                className="max-w-lg mx-auto"
            >
                <Form onFinish={onFinish} form={form} layout="vertical">
                    <Form.Item
                        name="nota"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your grade!',
                            },
                        ]}
                    >
                        <Input type="number" placeholder="Grade" className="w-full" />
                    </Form.Item>

                    <Form.Item
                        name="user_id"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your user!',
                            },
                        ]}
                    >
                        <Select
                            style={{ width: '100%' }}
                            allowClear
                            options={users}
                            placeholder="Select User"
                        />
                    </Form.Item>

                    <Form.Item name="id" hidden>
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            block
                            type="primary"
                            htmlType="submit"
                            className="w-full"
                        >
                            {formUpdate ? 'Update' : 'Create'}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Row className="p-4">
                <Col xs={24} className="flex justify-center">
                    <div className="w-full overflow-auto">
                        <Table
                            rowKey="id"
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

export default NotasPage;