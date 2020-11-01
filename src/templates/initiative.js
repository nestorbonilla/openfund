import React, { useState } from 'react';
import { Button, Row, Col, Card, Tag, Image, Carousel, Divider, Typography, Progress } from 'antd';
import { graphql } from 'gatsby';
import { FacebookOutlined, InstagramOutlined, ChromeOutlined } from '@ant-design/icons';
import GlobalLayout from '../components/globalLayout';
import InformationModal from '../components/informationModal';
import DonationModal from '../components/donationModal';
import fetch from 'node-fetch';
import { loadStripe } from '@stripe/stripe-js';
import netlifyIdentity from 'netlify-identity-widget';

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
          sumOfDonations
          sumOfRoots
          pledgeAmount
        }
      }
    }
`;

function Initiative({ data }) {

  const user = netlifyIdentity.currentUser();
  const initiative = data.hasura.initiatives;
  const [informationModalVisible, setInformationModalVisible] = useState(false);
  const [donationModalVisible, setDonationModalVisible] = useState(false);
  const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY);
  const [matchingText, setMatchingText] = useState('');
  const [amountToDonate, setAmountToDonate] = useState(0);

  const mT5 = `* for a donation of $ 5 the matchind fund will be $ ${Math.round(Math.pow((initiative.sumOfRoots + Math.sqrt(5)), 2) - initiative.pledgeAmount)}`;
  const mT10 = `* for a donation of $ 10 the matchind fund will be $ ${Math.round(Math.pow((initiative.sumOfRoots + Math.sqrt(10)), 2) - initiative.pledgeAmount)}`;
  const mT25 = `* for a donation of $ 25 the matchind fund will be $ ${Math.round(Math.pow((initiative.sumOfRoots + Math.sqrt(25)), 2) - initiative.pledgeAmount)}`;
  const mT50 = `* for a donation of $ 50 the matchind fund will be $ ${Math.round(Math.pow((initiative.sumOfRoots + Math.sqrt(50)), 2) - initiative.pledgeAmount)}`;
  const mT75 = `* for a donation of $ 75 the matchind fund will be $ ${Math.round(Math.pow((initiative.sumOfRoots + Math.sqrt(75)), 2) - initiative.pledgeAmount)}`;
  const mT100 = `* for a donation of $ 100 the matchind fund will be $ ${Math.round(Math.pow((initiative.sumOfRoots + Math.sqrt(100)), 2) - initiative.pledgeAmount)}`;

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

  const startDonationProcess = (amount) => {
    console.log('starting donation process with an amount of ', amount);
    if (user && amount > 0) {
      onDonationModalCreate({email: user.email, amount: amount});
    } else {
      setAmountToDonate(amount);
      
      console.log('verify updated amount of ', amount);
      setDonationModalVisible(true);
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
                    <Paragraph>$ {initiative.sumOfDonations} donated + $ {Math.pow(initiative.sumOfRoots, 2) - initiative.pledgeAmount} estimated match</Paragraph>
                    <Progress strokeColor="#000" strokeWidth={15} showInfo={false} style={{paddingLeft: "24px", paddingRight: "24px"}} percent={
                      Math.round((initiative.sumOfDonations + (Math.pow(initiative.sumOfRoots, 2) - initiative.pledgeAmount)) * 100 /initiative.goal)
                    } status="active" />
                    <Row justify="center">
                      <Col span={5}>
                        <div>$ {initiative.sumOfDonations + (Math.pow(initiative.sumOfRoots, 2) - initiative.pledgeAmount)} estimated total</div>
                      </Col>
                      <Col span={5} offset={14}>
                        <div>$ {initiative.goal} goal</div>
                      </Col>
                    </Row>                    
                    <Button type="link" style={{width: "100%"}} onClick={() => setInformationModalVisible(true)}>Learn how our donation matching works</Button>
                    <Divider />
                    <Row justify="center">
                      <Col span={3}>
                        <Button type="primary" block
                          onClick={() => startDonationProcess(5)}
                          onMouseEnter={() => setMatchingText(mT5)}
                        >$ 5</Button>
                      </Col>
                      <Col span={3} offset={1}>
                        <Button type="primary" block 
                          onClick={() => startDonationProcess(10)}
                          onMouseEnter={() => setMatchingText(mT10)}>$ 10</Button>
                      </Col>
                      <Col span={3} offset={1}>
                        <Button type="primary" block
                          onClick={() => startDonationProcess(25)}
                          onMouseEnter={() => setMatchingText(mT25)}>$ 25</Button>
                      </Col>
                      <Col span={3} offset={1}>
                        <Button type="primary" block
                          onClick={() => startDonationProcess(50)}
                          onMouseEnter={() => setMatchingText(mT50)}>$ 50</Button>
                      </Col>
                      <Col span={3} offset={1}>
                        <Button type="primary" block
                          onClick={() => startDonationProcess(75)}
                          onMouseEnter={() => setMatchingText(mT75)}>$ 75</Button>
                      </Col>
                      <Col span={3} offset={1}>
                        <Button type="primary" block
                          onClick={() => startDonationProcess(100)}
                          onMouseEnter={() => setMatchingText(mT100)}>$ 100</Button>
                      </Col>
                    </Row>
                    <br />
                    <Row justify="space-between">
                      <Col span={23}>{matchingText}</Col>
                    </Row>
                    <br />
                    <Row justify="center">
                      <Col span={23}>
                        <Button type="primary"
                          block
                          onClick={() => setDonationModalVisible(true)}>
                          Custom donation
                        </Button>
                      </Col>
                    </Row>
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
        {donationModalVisible && <DonationModal
          visible={donationModalVisible}
          onCreate={onDonationModalCreate}
          emailText={user && user.email}
          amountText={amountToDonate}
          onCancel={() => {
            setDonationModalVisible(false);
          }}
        />}
    </GlobalLayout>
  )
}

export default Initiative;