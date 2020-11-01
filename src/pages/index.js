import React, { useState, useEffect } from 'react';
import { Row, Col, Tag, Card, List, Tooltip, Button, Progress } from 'antd';
import { PlusCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { Link } from 'gatsby';
import GlobalLayout from '../components/globalLayout';
// import initiativeAvatar from "../images/initiative_avatar.png";
// import initiativeImage from "../images/initiative_detail.png";

const { Meta } = Card;

function Index() {

    const [initiatives, setInitiatives] = useState([]);

    const length = 200;
    
    //getData();

    useEffect(() => {   
        const fetchData = async () => {
            const data = await fetch('/.netlify/functions/initiatives')
                .then((response) => response.json());
            setInitiatives(data);
        }
        fetchData();
    }, []);

    return (
        <GlobalLayout>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 10,
                }}
                grid={{ gutter: 16, column: 3 }}
                dataSource={initiatives}
                header={
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 20
                }}>
                    <div></div>
                    <div style={{marginRight: "24px"}}>
                        <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        data-testid="add-contact-button"
                        >
                        <Link style={{color: "#000", fontFamily: "Suisse", textTransform: "uppercase", fontSize: "15px", padding:"20px"}} to="/opportunityedit:0">Create</Link>
                        </Button>
                    </div>
                </div>
                }
                renderItem={item => (
                <List.Item>
                    <Card
                        key={item.id}
                        cover={
                            <img
                                alt={item.title}
                                src={item.mainImage}
                            />
                        }
                        actions={[
                            <Tooltip placement="bottom" title="estimated">
                            <Progress strokeColor="#000" style={{paddingLeft: "24px", paddingRight: "24px"}} percent={50} status="active" />
                            </Tooltip>,
                            <Tooltip placement="bottom" title="fund initiative">
                            <Link to={'/initiative/' + item.id}><DollarOutlined key="fund" /></Link>
                            </Tooltip>
                        ]}
                    >
                    <Meta
                        title={<Link style={{color: "#000"}} to={'/initiative/' + item.id}>{item.title}</Link>}
                        description={
                        <div className="opportunity-detail-card">
                            <Row justify="space-between" style={{marginBottom: "8px"}}>
                                <Col span={24}>
                                    {item.deadline}
                                </Col>
                            </Row>
                            <Row justify="space-between">
                                <Col span={24}>
                                    <span>
                                        <Tag color={'yellow'} key={0} style={{marginBottom: "15px"}}>
                                            {item.category.toUpperCase()}
                                        </Tag>
                                    </span>
                                </Col>
                            </Row>
                            <Row justify="space-between">
                            <Col span={24}>{item.description.substring(0, length)}...</Col>
                            </Row>
                        </div>
                        }
                    />
                    </Card>
                </List.Item>
                )}
            />
        </GlobalLayout>
    );
}

export default Index;