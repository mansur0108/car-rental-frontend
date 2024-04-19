import { Container, Text, Flex, Space } from '@mantine/core';
import OTGLogo from './OTGLogo.png';

export function VendorHeader() {
  return (
    <header>
      <Container size="md">
        <Flex direction='row'>
          <img src={OTGLogo} width="28" height="28" alt="Logo" />
          <Space w="md" dir='column' />
          <Text style={{ fontSize: '28px', fontWeight: 'bold', verticalAlign: 'center', }}>OnTheGo</Text>
        </Flex>
      </Container>
    </header>
  );
}