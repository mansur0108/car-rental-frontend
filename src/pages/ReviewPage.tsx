import React, { useState, useEffect } from 'react';
import {
  Container,
  MantineProvider,
  Flex,
  Box,
  Button,
  Text,
} from '@mantine/core';
import axios from 'axios';
import { Header } from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';

const ReviewPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [vehicle, setVehicle] = useState<any>(null);
  const { location: selectedLocation, vehicleId } = location.state as {
    location: string;
    vehicleId: number;
  };

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/vehicle/${vehicleId}`,
          {
            withCredentials: true,
          }
        );
        setVehicle(response.data);
      } catch (error) {
        console.error('Failed to fetch vehicle data', error);
      }
    };

    if (vehicleId) fetchVehicleData();
  }, [vehicleId]);

  if (!vehicle) {
    return <Text>Loading vehicle data...</Text>;
  }

  return (
    <MantineProvider>
      <Box style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
        <Header />
        <Container style={{ paddingTop: '100px' }} fluid>
          {/* Back button */}
          <Button
            variant='outline'
            onClick={() =>
              navigate('/selection', { state: { location: selectedLocation } })
            }
          >
            Back
          </Button>
        </Container>
        {/* Vehicle Summary */}
        <Flex direction='column' style={{ marginLeft: '100px' }}>
          <Text size='xl'>Car Summary:</Text>
          <Text>
            Name: {vehicle.make} {vehicle.model}
          </Text>
          <Text>Year: {vehicle.year}</Text>
          <Text>Seats: {vehicle.seats}</Text>
          <Text>Doors: {vehicle.doors}</Text>
          <Text>Body Type: {vehicle.bodyType}</Text>
          <Text>Rent Per Day: ${vehicle.rentCostPerDay}</Text>
          <Text>Color: {vehicle.color}</Text>
        </Flex>
      </Box>
    </MantineProvider>
  );
};

export default ReviewPage;
