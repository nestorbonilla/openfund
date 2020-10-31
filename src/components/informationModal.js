import React from 'react';
import { Modal, Typography } from 'antd';
import { Link } from 'gatsby';

const { Title, Text, Paragraph } = Typography;

const InformationModal = ({ visible, onCancel }) => {

  return (
    <Modal
      visible={visible}
      closable={true}
      footer={null}
      maskClosable={false}
      onCancel={onCancel}
    >
        <Title level={3}>How our donation matching works?</Title>
        <Paragraph>
            RxC Openfund is a democratic way of funding projects. They’ve put together a matching pool of $x from local philanthropists that is going to be distributed to initiatives, to help bridge the gap between normal and now.
        </Paragraph>
        <Paragraph>
            RxC is going to match contributions based on the number of people contributing more so than the amount they contribute. This is a way of making sure that the matching power of each contributor is maximized.
        </Paragraph>
        <Paragraph>
            An Important Note About Quadratic Funding: Total matching is calculated at the end of the round. That is why all matches displayed are estimates only. Actual matches will be determined at the end of the round by how many people total have donated to the business!
        </Paragraph>
        <Title level={4}>How does it work in practice?</Title>
        <Paragraph>
            In traditional 1:1 Matching
        </Paragraph>
        <Paragraph>
            <ul>
                <li>
                    <Text>Grant 1 gets $100</Text>
                </li>
                <li>
                    <Text>Grant 2 gets $100</Text>
                </li>
                <li>
                    <Text>At the end of the round, both grants get $100 in matching</Text>
                </li>
            </ul>
        </Paragraph>
        <Paragraph>
            In RxC Quadratic Funding Matching Formula:
        </Paragraph>
        <Paragraph>
            <ul>
                <li>
                    <Text>Grant 1 gets $100 from 1 funder.</Text>
                </li>
                <li>
                    <Text>Grant 2 gets $100 from 10 funders.</Text>
                </li>
                <li>
                    <Text>At the end of the round, Grant 1 gets $10 in matching, Grant 2 gets $190 in matching.</Text>
                </li>
            </ul>
        </Paragraph>
        <Paragraph>
            Note: Match estimates are variable, and depend on # contributors The above numbers are computed based upon a round size of $x, wherein there are y contributors to the round.
        </Paragraph>
        <Link to="https://gitcoin.co/blog/experiments-with-liberal-radicalism/">Read more here!</Link>
    </Modal>
  );
}

export default InformationModal;