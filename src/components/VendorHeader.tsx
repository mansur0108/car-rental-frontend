import { Container, Text, Flex, Space, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export function VendorHeader() {
  const navigate = useNavigate();

  function onLogoutClick() {
    navigate('/');
  };
  
  return (
    <header>
      <Container size="md">
        <Flex direction='row' style={{ justifyContent: "space-between" }}>
          <Text style={{ fontSize: '28px', fontWeight: 'bold', verticalAlign: 'center', }}>OnTheGo</Text>
          <Button onClick={onLogoutClick}>Logout</Button>
        </Flex>
      </Container>
    </header>
  );
}