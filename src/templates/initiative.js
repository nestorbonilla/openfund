import React, { useState } from 'react';
import { Button, Row, Col, Card, Avatar, Tag, Carousel, Tooltip, Modal, Divider, Typography, Progress } from 'antd';
import { graphql } from 'gatsby';
import { CalendarOutlined, TagOutlined } from '@ant-design/icons';
import GlobalLayout from '../components/globalLayout';
import DonationModal from '../components/donationModal';
import initiativeAvatar from '../images/initiative_avatar.png';
import fetch from 'node-fetch';
import { loadStripe } from '@stripe/stripe-js';

const { Title, Paragraph } = Typography;
const { Meta } = Card;

export const query = graphql`
    query ($id: String!) {
      hasura {
        initiatives: initiatives_by_pk(id: $id) {
            id
            title
            description
        }
      }
    }
`;

function Initiative({ data }) {

    const initiativeInfo = data.hasura.initiatives;
    console.log('graphql data', initiativeInfo);
  const [modalVisible, setModalVisible] = useState(false);
  const [donationModalVisible, setDonationModalVisible] = useState(false);
  const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);

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
     createCheckout(values);
  };

  const createCheckout = async (values) => {    
    const donation = {
      id: "3",
      initiativeId: "2",
      email: values.email,
      amount: values.amount,
      time: "11-20-2020"
    };
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(donation)
    }).then(res => res.json());

    // console.log("donation session, ", response);
    // console.log("publishable key ", process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
    
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.sessionId,
    });

    if (error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      console.log('stripe error', error);
    }

    //console.log('Checkout response: ', response);
      //console.log('Received response: ', response);
      //createDonation(donation);      
    //});
  }

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
                    <Col span={22}>some</Col>
                </Row>
                <Divider />
                <Row justify="space-between">
                    <Col span={24}>{initiativeData.description}</Col>
                </Row>
                <Divider />
                <Row justify="center">
                    <Col span={12}>
                        <Title level={2}>{initiativeData.title}</Title>
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
    </GlobalLayout>
  )
}

export default Initiative;