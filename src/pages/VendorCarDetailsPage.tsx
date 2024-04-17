import React, { useState, useEffect } from 'react';
import {
  Container,
  MantineProvider,
  Flex,
  Box,
  Button,
  Text,
  Title,
  Divider,
  SimpleGrid,
  Space,
} from '@mantine/core';
import axios from 'axios';
import { Header } from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';

const VendorCarDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [vehicle, setVehicle] = useState<any>(null);
  const [locationName, setLocationName] = useState<string>('');
  const { location: selectedLocation, vehicleId } = location.state as {
    location: string;
    vehicleId: number;
  };

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const vehicleResponse = await axios.get(
          `http://localhost:3000/api/v1/vehicle/${vehicleId}`,
          {
            withCredentials: true,
          }
        );
        setVehicle(vehicleResponse.data);

        const locationResponse = await axios.get(
          `http://localhost:3000/api/v1/location/${selectedLocation}`,
          { withCredentials: true }
        );
        setLocationName(locationResponse.data.address);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    if (vehicleId && selectedLocation) fetchVehicleData();
  }, [vehicleId, selectedLocation]);

  if (!vehicle || !selectedLocation) {
    return <Text>Loading vehicle data...</Text>;
  }

  return (
    <MantineProvider>
      <Box style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
        <Header />
        <Container style={{ paddingTop: '100px', paddingBottom: '10px' }} fluid>
          {/* Back button */}
          <Button
            variant='outline'
            onClick={() =>
              navigate('/vendorcars', {
                state: { location: selectedLocation },
              })
            }
          >
            Back
          </Button>
        </Container>

        <Container>
          <SimpleGrid cols={{ base: 1, lg: 2 }}>
            <Flex justify='center' direction='column' gap='md'>
              {/* Rental Details */}
              <Flex
                direction='column'
                style={{
                  borderWidth: 1,
                  borderColor: '#E9ECEF',
                  borderStyle: 'solid',
                  borderRadius: 8,
                  background: '#fff',
                  padding: '15px',
                }}
              >
                <Title order={2}>Rental Details</Title>
                <Divider my='xs' />
                <Text td='underline' size='xl'>
                  Pickup & Return Location
                </Text>
                <Text size='md'>{locationName}</Text>
              </Flex>
              {/* Vehicle Summary */}
              <Flex
                direction='column'
                style={{
                  borderWidth: 1,
                  borderColor: '#E9ECEF',
                  borderStyle: 'solid',
                  borderRadius: 8,
                  background: '#fff',
                  padding: '15px',
                }}
              >
                <Title order={2}>Vehicle Summary</Title>
                <Divider my='sm' />
                <Text td='underline' size='xl'>
                  {vehicle.make} {vehicle.model} ({vehicle.year})
                </Text>
                <Text>Seats: {vehicle.seats}</Text>
                <Text>Doors: {vehicle.doors}</Text>
                <Text>Body Type: {vehicle.bodyType}</Text>
                <Text>Color: {vehicle.color}</Text>
              </Flex>
            </Flex>
            <Flex
              direction='column'
              style={{
                borderWidth: 1,
                borderColor: '#E9ECEF',
                borderStyle: 'solid',
                borderRadius: 8,
                background: '#fff',
                width: '100%',
                padding: '15px',
              }}
            >
              <Title order={2}>Options</Title>
              <Divider my='xs' />
              <Space h='md' />
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>
    </MantineProvider>
  );
};

export default VendorCarDetailsPage;
