import React, { useState, useEffect } from 'react';
import { Button, Row, Col, Card, Table, Tooltip } from 'antd';
import GlobalLayout from '../components/globalLayout';
import netlifyIdentity from 'netlify-identity-widget';

const { Meta } = Card;

function Account() {

    const user = netlifyIdentity.currentUser();
    const [donations, setDonations] = useState([]);

    useEffect(() => {
      //console.log('user ', user);
      //if (user) {
        const fetchData = async () => {
          const response = await fetch('/.netlify/functions/donations').then((res) => res.json());
          setDonations(response);
        }
        // const fetchData = async () => {
        //   const response = await fetch('/.netlify/functions/donations-by-email', {
        //     method: 'POST',
        //     body: JSON.stringify({ email: "nestor.bonilla.s@gmail.com" })
        //   }).then((res) => res.json());
        //   setDonations(response);
        // }
        fetchData();
      //}      
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
      key: 'amount',
      dataIndex: 'amount'
    }
  ];

  const data = () => {
    console.log('donations ', donations);
    let donationsTable = []; 
    if (donations) {
      donations.forEach(donation => {
        console.log('donation ', donation);
        donationsTable.push({
          key: donation.id,
          id: donation.id,
          name: donation.initiative,
          amount: "$ " + donation.amount
        });
      });
    }    
    return donationsTable;
  }

  // const data = [
  //   {
  //     key: '1',
  //     id: '1',
  //     name: 'Donation 1',
  //     tags: '200',
  //   },
  //   {
  //     key: '2',
  //     id: '2',
  //     name: 'Donation 2',
  //     tags: '500',
  //   },
  //   {
  //     key: '3',
  //     id: '3',
  //     name: 'Donation 3',
  //     tags: '100',
  //   },
  // ];

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
                    dataSource={data()}
                    key={data.id}
                />
            </Col>
      </Row>
    </GlobalLayout>
  )
}

export default Account;