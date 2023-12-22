import { GithubOutlined } from '@ant-design/icons';
import { Button, Flex, Layout, Typography } from 'antd';
import { FC } from 'react';

const Footer: FC = () => {
  return (
    <Layout.Footer className="footer">
      <Flex align="center" gap={10}>
        <Typography.Text code>Backend: </Typography.Text>
        <a href="https://github.com/MaratKhabibzhanov" target="_blank">
          <Button icon={<GithubOutlined />} shape="circle" />
        </a>
      </Flex>
      <Flex align="center" gap={10}>
        <Typography.Text code>Frontend: </Typography.Text>
        <a href="https://github.com/skrill3901" target="_blank">
          <Button icon={<GithubOutlined />} shape="circle" />
        </a>
      </Flex>
    </Layout.Footer>
  );
};

export default Footer;
