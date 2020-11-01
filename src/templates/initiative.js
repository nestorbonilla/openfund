import React, { useState } from 'react';
import { Button, Row, Col, Card, Tag, Image, Carousel, Tooltip, Divider, Typography, Progress } from 'antd';
import { graphql } from 'gatsby';
import { FacebookOutlined, InstagramOutlined, ChromeOutlined } from '@ant-design/icons';
import GlobalLayout from '../components/globalLayout';
import InformationModal from '../components/informationModal';
import DonationModal from '../components/donationModal';
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
          category
          description
          status
          deadline
          goal
          fbUrl
          igUrl
          webUrl
          mainImage
        }
      }
    }
`;

function Initiative({ data }) {

  const initiative = data.hasura.initiatives;
  console.log('graphql data', initiative);
  const [informationModalVisible, setInformationModalVisible] = useState(false);
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

    const donation = {
      initiative: initiative.title,
      email: values.email,
      amount: values.amount,
      image: initiative.mainImage
    };

    createDonation(donation);
    createCheckout(donation);
  };

  const createCheckout = async (values) => {
    
    const response = await fetch('/.netlify/functions/create-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(res => res.json());

    const stripe = await stripePromise;
    
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.sessionId,
    });

    if (error) {
      console.log('stripe error', error);
    }
  }

  return (
    <GlobalLayout>      
        <Card
          style={{ width: '100%' }}
          cover={
          <Carousel>
            <div className='banner-image'> 
              <Image src={initiative.mainImage} />
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
            title={initiative.title}
            style={{}}
            description={
              <div className="opportunity-detail-card">
                <Row justify="space-between" style={{marginBottom: "8px"}}>
                  <Col span={24}>
                    {initiative.deadline}
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col span={24}>
                    <span>
                      <Tag color={'yellow'} key={0} style={{marginBottom: "15px"}}>
                        {initiative.category.toUpperCase()}
                      </Tag>
                    </span>
                  </Col>
                </Row>
                <Row justify="center">
                  {initiative.fbUrl &&
                    <Col span={5}>
                      <FacebookOutlined /><br/><Button type="link" to={initiative.fbUrl}>{initiative.fbUrl.replace("https://facebook.com/", "")}</Button>
                    </Col>
                  }
                  {initiative.igUrl &&
                    <Col span={5}>
                      <InstagramOutlined /><br/><Button type="link" to={initiative.igUrl}>{initiative.igUrl.replace("https://instagram.com/", "")}</Button>
                    </Col>
                  }
                  {initiative.webUrl &&
                    <Col span={5}>
                      <ChromeOutlined /><br/><Button type="link" to={initiative.webUrl}>{initiative.webUrl.replace("https://", "")}</Button>
                    </Col>
                  }
                </Row>
                <Divider />
                <Row justify="space-between">
                    <Col span={24}>{initiative.description}</Col>
                </Row>
                <Divider />
                <Row justify="center">
                  <Col span={12}>
                    <Title level={4}>Support us</Title>
                    <Paragraph>some</Paragraph>
                    <Progress strokeColor="#000" strokeWidth={15} showInfo={false} style={{paddingLeft: "24px", paddingRight: "24px"}} percent={50} status="active" />
                    <Row justify="center">
                      <Col span={1}>
                        <div>hello</div>
                      </Col>
                      <Col span={1} offset={10}>
                        <div>hello2</div>
                      </Col>
                    </Row>
                    <Button type="link" style={{width: "100%"}} onClick={() => setInformationModalVisible(true)}>Learn how our donation matching works</Button>
                  </Col>
                </Row>
              </div>
            }
          />
        </Card>
        <InformationModal
          visible={informationModalVisible}
          onCancel={() => {
            setInformationModalVisible(false);
          }}
        />
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