import { GithubOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Typography } from 'antd';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <Layout.Footer className="footer">
      <Flex align="center" gap={10}>
        <Typography.Text code>Backend: </Typography.Text>
        <Button icon={<GithubOutlined />} shape="circle" />
      </Flex>
      <Flex align="center" gap={10}>
        <Typography.Text code>Frontend: </Typography.Text>
        <Button icon={<GithubOutlined />} shape="circle" />
      </Flex>
    </Layout.Footer>
  );
};

export default Footer;
