import React, { useState } from 'react';
import { Form, Input, InputNumber, Modal } from 'antd';

const DonationModal = ({ visible, onCreate, onCancel, emailText, amountText }) => {
  const [form] = Form.useForm();
  const [email, setEmail] = useState(emailText);
  const [amount, setAmount] = useState(amountText);
  
  return (
    <Modal
      visible={visible}
      closable={false}
      maskClosable={false}
      okText="Fund"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: 'Please input your email',
            },
          ]}
        >
          <Input
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              type: 'number',
              min: 0,
              max: 99999
            },
            {
              required: true,
              message: 'Please input your amount',
            }
          ]}>
          <InputNumber
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DonationModal;