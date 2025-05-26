import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';

interface ModalPopupProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    form: any;
    onCreate: (values: any) => void;
    onUpdate: (values: any) => void;
    editingRecord?: any;
}

const ModalPopup: React.FC<ModalPopupProps> = ({ form, onCreate,onUpdate, isModalOpen, setIsModalOpen, editingRecord }) => {
    console.log(editingRecord);

    useEffect(() => {
        if (editingRecord) {
            form.setFieldsValue(editingRecord); // Populate form with editing record
        } else {
            form.resetFields(); // Reset form for creating a new user
        }
    }, [editingRecord, form]);
    return (
        <>
            <Modal
                open={isModalOpen}
                title={editingRecord ? 'Edit User' : 'Create New User'} // Dynamic title
                okText={editingRecord ? 'Save' : 'Create'} // Dynamic button text
                cancelText="Cancel"
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()} // Trigger form submission
            >
                <Form
                    layout="vertical"
                    form={form}
                    name="form_in_modal"
                    initialValues={{ modifier: 'public' }}
                    onFinish={(values) => editingRecord ? onUpdate(values) : onCreate(values)}
                >
                    <Form.Item
                        name="first_name"
                        label="First Name"
                        rules={[{ required: true, message: 'Please enter the First name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please enter the Last name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email address' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="avatar"
                        label="Profile Image URL"
                        rules={[
                            { required: true, message: 'Please enter Profile Image URL' },
                            { type: 'url', message: 'Please enter a valid URL' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default ModalPopup;