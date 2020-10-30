import React, { useState } from 'react';
import { Button, Row, Col, Card, Avatar, Tabs, Tag, Table, Carousel, Tooltip, Modal, Divider, Typography, Progress } from 'antd';
import { CalendarOutlined, TagOutlined } from '@ant-design/icons';
import GlobalLayout from '../components/globalLayout';
import DonationModal from '../components/donationModal';
import initiativeAvatar from '../images/initiative_avatar.png';
import fetch from 'node-fetch';

const { TabPane } = Tabs;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

function Initiative({id}) {

  const [modalVisible, setModalVisible] = useState(false);

  const [donationModalVisible, setDonationModalVisible] = useState(false);

  const createDonation = async (values) => {
    console.log('values to send: ', values);
    await fetch('/.netlify/functions/add-donation', {
      method: 'POST',      
      body: JSON.stringify(values)
    }).then((response) => {
      console.log('Received response: ', response);
      setDonationModalVisible(false);
    });
  }
  const onDonationModalCreate = (values) => {    
    const donation = {
      id: "3",
      initiativeId: "2",
      email: values.email,
      amount: values.amount,
      time: "11-20-2020"
    };    
    createDonation(donation);    
  };

  const initiative = {
      title: "some"
  };
  
  const columns = [
    {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      render: text => <a href="/">{text}</a>,
    },
    {
      title: 'Detail',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            //if (tag === 'loser') {
            //  color = 'volcano';
            //}
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    }
  ];

  const data = [
    {
      key: '1',
      name: 'New York No. 1 Lake Park',
      tags: ['value needed'],
    },
    {
      key: '2',
      name: 'London No. 1 Lake Park',
      tags: ['automatic'],
    },
    {
      key: '3',
      name: 'Sidney No. 1 Lake Park',
      tags: ['automatic'],
    },
  ];

  const initiativeData = {
    key: 0,
    name: "Time Warp Comics & Games",
    deadline: 100000,
    tags: ["youth", "activism"],
    description: "Boulder's source for comics, card games, collectibles, and other goodies for 35 years and counting!",
    status: 2,
    image: [""],
    avatar: initiativeAvatar
  };

  const contentStyle = {
    height: '300px',
    color: '#000',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#EDFF38',
  };

  const tags = (data) => (
    data.map(tag => (
        <Tag key={tag}>{tag}</Tag>
    ))
  );

  return (
    <GlobalLayout>
        <Card
            style={{ width: '100%' }}
            cover={
            <Carousel autoplay>
                <div key={1}>
                <h3 style={contentStyle}>1</h3>
                </div>
                <div key={2}>
                <h3 style={contentStyle}>2</h3>
                </div>
            </Carousel>
            }
            actions={[
            <Tooltip placement="bottom" title="views">
                <Row justify="center">
                    <Col span={12}>
                        <Button type="primary"                          
                          block
                          onClick={() => setDonationModalVisible(true)}>
                          Fund Initiative
                        </Button>
                    </Col>
                </Row>
            </Tooltip>
            ]}
        >
            <Meta
            avatar={<Avatar src={initiativeAvatar} />}
            title={initiativeData.name}
            description={
                <div className="opportunity-detail-card">
                <Row justify="space-between" style={{marginBottom: "8px"}}>
                    <Col span={2}>
                    <Tooltip placement="left" title="deadline">
                        <CalendarOutlined />
                    </Tooltip>
                    </Col>
                    <Col span={22}>
                    {initiativeData.deadline}
                    </Col>
                </Row>
                <Row justify="space-between">
                    <Col span={2}>
                    <Tooltip placement="left" title="tags">
                        <TagOutlined />
                    </Tooltip>
                    </Col>
                    <Col span={22}>{tags(initiativeData.tags)}</Col>
                </Row>
                <Divider />
                <Row justify="space-between">
                    <Col span={24}>{initiativeData.description}</Col>
                </Row>
                <Divider />
                <Row justify="center">
                    <Col span={12}>
                        <Title level={2}>{initiative.title}</Title>
                        <Paragraph>some</Paragraph>
                        <Progress strokeColor="#000" strokeWidth={20} showInfo={false} style={{paddingLeft: "24px", paddingRight: "24px"}} percent={50} status="active" />
                        <Row justify="center">
                            <Col span={1}>
                                <div>hello</div>
                            </Col>
                            <Col span={1} offset={10}>
                                <div>hello2</div>
                            </Col>
                        </Row>
                        <Button type="link" style={{width: "100%"}} onClick={() => setModalVisible(true)}>Learn how our donation matching works</Button>
                    </Col>
                </Row>
                </div>
            }
            />
        </Card>
        <Modal
            title="Vertically centered modal dialog"
            centered
            visible={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
            >
            <p>some contents...</p>
            <p>some contents...</p>
            <p>some contents...</p>
        </Modal>
        <DonationModal
          visible={donationModalVisible}
          onCreate={onDonationModalCreate}
          onCancel={() => {
            setDonationModalVisible(false);
          }}
        />
      <Tabs defaultActiveKey="1" centered={true}>
        <TabPane tab="Pre requirements" key={1}>
          <Table
            columns={columns}
            dataSource={data}
            key={data.id}
          />
        </TabPane>
        <TabPane tab="Post requirements" key={2}>
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </GlobalLayout>
  )
}

export default Initiative;