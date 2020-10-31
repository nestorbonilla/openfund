import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Avatar, Tabs, Tag, Table, Tooltip, Modal, Divider, Typography, Progress } from 'antd';
import { CalendarOutlined, TagOutlined } from '@ant-design/icons';
import GlobalLayout from '../components/globalLayout';
import initiativeAvatar from '../images/initiative_avatar.png';
import netlifyIdentity from 'netlify-identity-widget';

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

function Account() {

    const user = netlifyIdentity.currentUser();
    const [donations, setDonations] = useState([]);

    const [modalVisible, setModalVisible] = useState(false);
    const [donationModalVisible, setDonationModalVisible] = useState(false);

    useEffect(() => {   
        const fetchData = async () => {
            const data = await fetch('/.netlify/functions/donations')
                .then((response) => response.json());
                setDonations(data);
        }
        fetchData();
        console.log(donations);
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
      name: 'New York No. 1 Lake Park',
      tags: '200',
    },
    {
      key: '2',
      id: '2',
      name: 'London No. 1 Lake Park',
      tags: '500',
    },
    {
      key: '3',
      id: '3',
      name: 'Sidney No. 1 Lake Park',
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
                    avatar={<Avatar src={initiativeAvatar} />}
                    title={user.user_metadata.full_name}
                    description={
                        <div className="opportunity-detail-card">
                            <Row justify="space-between" style={{marginBottom: "8px"}}>
                                <Col span={2}>
                                <Tooltip placement="left" title="deadline">
                                    <CalendarOutlined />
                                </Tooltip>
                                </Col>
                                <Col span={22}>
                                {user.email}
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col span={2}>
                                <Tooltip placement="left" title="tags">
                                    <TagOutlined />
                                </Tooltip>
                                </Col>
                                <Col span={22}>{user.created_at}</Col>
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