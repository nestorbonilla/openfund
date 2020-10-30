import React, { useState, useEffect } from 'react';
import { Row, Col, Tag, Card, List, Tooltip, Button, Progress } from 'antd';
import { CalendarOutlined, TagOutlined, PlusCircleOutlined, DollarOutlined } from '@ant-design/icons';
import { Link } from 'gatsby';
import GlobalLayout from '../components/globalLayout';
// import initiativeAvatar from "../images/initiative_avatar.png";
// import initiativeImage from "../images/initiative_detail.png";

const { Meta } = Card;

function Index() {

    const [initiatives, setInitiatives] = useState([]);

    const length = 200;
    const role = 'organization';
    
    //getData();

    useEffect(() => {   
        const fetchData = async () => {
            const data = await fetch('/.netlify/functions/initiatives')
                .then((response) => response.json());
            setInitiatives(data);
        }
        fetchData();
    }, []);

    const tags = (data) => (
      data.map(tag => (
          <Tag key={tag}>{tag}</Tag>
      ))
    )

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
                    {role === "organization" && (
                    <div style={{marginRight: "24px"}}>
                        <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        data-testid="add-contact-button"
                        >
                        <Link style={{color: "#000", fontFamily: "Messer", textTransform: "uppercase", fontSize: "18px", padding:"20px"}} to="/opportunityedit:0">Create</Link>
                        </Button>
                    </div>
                    )}              
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
                        <Link to={'/initiative:' + item.id}><DollarOutlined key="fund" /></Link>
                        </Tooltip>
                    ]}
                    >
                    <Meta
                        title={<Link style={{color: "#000"}} to={'/initiative:' + item.id}>{item.title}</Link>}
                        description={
                        <div className="opportunity-detail-card">
                            <Row justify="space-between">
                            <Col span={2}>
                                <Tooltip placement="left" title="deadline">
                                <CalendarOutlined />
                                </Tooltip>
                            </Col>
                            <Col span={22}>
                                {item.deadline}
                            </Col>
                            </Row>
                            <Row justify="space-between" style={{marginTop: "12px", marginBottom: "12px"}}>
                            <Col span={2}>
                                <Tooltip placement="left" title="tags">
                                <TagOutlined />
                                </Tooltip>
                            </Col>
                            <Col span={22}>categories</Col>
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