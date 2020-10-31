import React from 'react';
import { Result } from 'antd';
import { Link } from 'gatsby';
import GlobalLayout from '../components/globalLayout';

function Success() {
  return (
    <GlobalLayout>
      <Result
        status="success"
        title="Successfully donated a Quadratic Fund Initiative!"
        subTitle="Thank you for your support. A confirmation was sent to your email."
        extra={[
          <Link className="ant-btn ant-btn-link" type="primary" key="console" to="/">
            Fund More Initiatives
          </Link>
        ]}
      />
    </GlobalLayout>
  )
}

export default Success;