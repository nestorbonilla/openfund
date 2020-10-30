import React from 'react';
import { Form, Input, Modal } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

const DonationModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
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
          <Input />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[
            {
              required: true,
              message: 'Please input your amount',
            },
          ]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DonationModal;

// import React, { useState } from 'react';
// import { Form, Input, Button, Modal } from 'antd';
// import { UserOutlined, LockOutlined } from '@ant-design/icons';

// const DonationModal = ({ visible, onCancel, onCreate, form }) => {

//     //const { getFieldDecorator } = form;

//     const donName = "Test";;
//     const [donationForm] = Form.useForm();
//     const [donEmail, setDonEmail] = useState("");
//     const [donAmount, setDonAmount] = useState("");
//     const [donTime, setDonTime] = useState("");

//   const onFinish = values => {
//     console.log('Received values of form: ', values);
//   };

//   return (
//     <Modal
//         centered
//         closable={false}
//         visible={visible}
//         okText="Donate"
//         onCancel={onCancel}
//         onOk={onCreate}
//     >
//         <Form
//             layout="vertical"
//             form={donationForm}
//             onFinish={onFinish}
//         >
//             <Form.Item
//                 name="don-initiative"
//                 label="Initiative"
//                 valuePropName="don-initiative"
//             >
//                 <Input
//                     placeholder="initiative"
//                     value={donName} />
//             </Form.Item>
//             <Form.Item
//                 name="don-email"
//                 label="Email"
//                 valuePropName="don-email"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input your email',
//                     },
//                 ]}
//             >
//                 <Input
//                     placeholder="email"
//                     value={donEmail}
//                     onChange={e => setDonEmail(e.target.value)} />
//             </Form.Item>
//             <Form.Item
//                 name="don-amount"
//                 label="Amount"
//                 valuePropName="don-amount"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input the donation amount',
//                     },
//                 ]}
//             >
//                 <Input
//                     placeholder="amount"
//                     value={donAmount}
//                     onChange={e => setDonAmount(e.target.value)} />
//             </Form.Item>            
            
//             {/* <Form.Item>
//                 <Button type="primary" htmlType="submit">Fund initiative</Button>
//             </Form.Item> */}
//         </Form>
//     </Modal>
//   );
// };

// //const DonationModal = Form.create({ name: "modal_form" })(DonationModalComponent);

// export default DonationModal;

// // import React, { useState } from 'react';
// // import { Form, Input, Modal } from 'antd';
// // //import { UserOutlined, LockOutlined } from '@ant-design/icons';

// // const DonationModalComponent = ({ visible, onCancel, onCreate, form }) => {

// //     const { getFieldDecorator } = form;

// //     return (
// //         <Modal
// //             centered
// //             visible={visible}
// //             okText="Donate"
// //             closable={false}        
// //             onCancel={onCancel}
// //             onOk={onCreate}
// //         >
// //             <Form layout="vertical">
// //                 <Form.Item label="Initiative">
// //                     {getFieldDecorator("name")(<Input type="text" />)}
// //                 </Form.Item>
// //                 <Form.Item label="Email">
// //                     {getFieldDecorator("email")(<Input type="text" />)}
// //                 </Form.Item>
// //                 <Form.Item label="Amount">
// //                     {getFieldDecorator("amount")(<Input type="text" />)}
// //                 </Form.Item>
// //             </Form>
// //         </Modal>
// //     );
// // };

// // const DonationModal = Form.create({ name: "modal_form" })(DonationModalComponent);

// // export default DonationModal;