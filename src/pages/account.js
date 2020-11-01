import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Avatar, Table, Tooltip } from 'antd';
import { CalendarOutlined, TagOutlined } from '@ant-design/icons';
import GlobalLayout from '../components/globalLayout';
import initiativeAvatar from '../images/initiative_avatar.png';
import netlifyIdentity from 'netlify-identity-widget';

const { Meta } = Card;

function Account() {

    const user = netlifyIdentity.currentUser();
    const [donations, setDonations] = useState([]);

    useEffect(() => {
      if (user) {
        const fetchData = async () => {
          const response = await fetch('/.netlify/functions/donations-by-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          }).then((res) => res.json());
          setDonations(response);
          console.log('donations by id ', response);
        }
        fetchData();
      }      
    }, []);
  
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Initiative',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="/">{text}</a>,
    },
    {
      title: 'Funding',
      key: 'tags',
      dataIndex: 'tags'
    }
  ];

  const data = [
    {
      key: '1',
      id: '1',
      name: 'Donation 1',
      tags: '200',
    },
    {
      key: '2',
      id: '2',
      name: 'Donation 2',
      tags: '500',
    },
    {
      key: '3',
      id: '3',
      name: 'Donation 3',
      tags: '100',
    },
  ];

  return (
    <GlobalLayout>
        <Row justify="space-between" style={{marginBottom: "8px"}}>
            <Col span={8}>
                <Card
                    style={{ width: '100%' }}

                    actions={[
                    <Tooltip placement="bottom" title="views">
                        <Row justify="center">
                            <Col span={12}>
                                <Button type="primary"                          
                                block>
                                Invite
                                </Button>
                            </Col>
                        </Row>
                    </Tooltip>
                    ]}
                >
                    <Meta
                    title={user && user.user_metadata.full_name}
                    description={
                        <div className="opportunity-detail-card">
                            <Row justify="space-between" style={{marginBottom: "8px"}}>
                                <Col span={24}>
                                <Tooltip placement="left" title="email">
                                    {user && user.email}
                                </Tooltip>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col span={24}>
                                  <Tooltip placement="left" title="account creation">
                                      {user && user.created_at.split("T")[0]}
                                  </Tooltip>
                                </Col>
                            </Row>
                        </div>
                    }
                    />
                </Card>
            </Col>
            <Col span={14}>
                <Table
                    columns={columns}
                    dataSource={data}
                    key={data.id}
                />
            </Col>
      </Row>
    </GlobalLayout>
  )
}

export default Account;