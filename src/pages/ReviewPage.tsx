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

const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [vehicle, setVehicle] = useState<any>(null);
  const [locationName, setLocationName] = useState<string>('');
  const {
    location: selectedLocation,
    vehicleId,
    pickupDate,
    returnDate,
  } = location.state as {
    location: string;
    vehicleId: number;
    pickupDate: Date;
    returnDate: Date;
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

  const rentalDays = Math.ceil(
    (new Date(returnDate).getTime() - new Date(pickupDate).getTime()) /
      (1000 * 3600 * 24)
  );

  const totalCost = rentalDays * vehicle.rentCostPerDay;

  const handleReserveNow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/vehicle/${vehicleId}/rent`,
        { lengthInDays: rentalDays },
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert('Vehicle reserved successfully!');
        navigate('/dashboard');
      } else {
        alert('Failed to reserve vehicle: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error reserving vehicle:', error);
      alert('Error reserving vehicle. Please try again later.');
    }
  };

  return (
    <MantineProvider>
      <Box style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
        <Header />
        <Container style={{ paddingTop: '100px', paddingBottom: '10px' }} fluid>
          {/* Back button */}
          <Button
            variant='outline'
            onClick={() =>
              navigate('/selection', {
                state: { location: selectedLocation, pickupDate, returnDate },
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
                  Dates
                </Text>
                <Text size='md'>
                  Pick-up Date: {pickupDate?.toLocaleDateString()}
                </Text>
                <Text size='md'>
                  Return Date: {returnDate?.toLocaleDateString()}
                </Text>
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
              <Title order={2}>Purchase Summary</Title>
              <Divider my='xs' />
              <Flex gap='xl'>
                <Text size='xl'>Days Rented:</Text>
                <Text style={{ marginLeft: '150px' }} size='xl'>
                  {rentalDays}
                </Text>
              </Flex>
              <Space h='md' />
              <Flex gap='xl'>
                <Text size='xl'>Rent / Day:</Text>
                <Text style={{ marginLeft: '167px' }} size='xl'>
                  ${vehicle.rentCostPerDay}
                </Text>
              </Flex>
              <Divider
                my='xs'
                color='#000000'
                style={{ marginLeft: '275px', marginRight: '35px' }}
              />
              <Space h='md' />

              <Flex gap='xl'>
                <Text size='xl'>Total:</Text>
                <Text style={{ marginLeft: '218px' }} size='xl'>
                  ${totalCost.toFixed(2)}
                </Text>
              </Flex>
              <Divider my='xs' />
              <Space h='md' />
              <Button
                variant='outline'
                size='xl'
                radius='xl'
                onClick={handleReserveNow}
              >
                Reserve Now
              </Button>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>
    </MantineProvider>
  );
};

export default ReviewPage;
