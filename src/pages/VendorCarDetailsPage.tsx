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
  Select,
} from '@mantine/core';
import { Notifications, notifications } from '@mantine/notifications';
import axios from 'axios';
import { Header } from '../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';

const VendorCarDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [locations, setLocations] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [vehicle, setVehicle] = useState<any>(null);
  const [locationName, setLocationName] = useState<string>('');
  const [changedLocation, setSelectedLocation] = useState<string | null>(null);
  const { location: selectedLocation, vehicleId } = location.state as {
    location: string;
    vehicleId: number;
  };

  const handleLocationChange = (value: string | null) => {
    setSelectedLocation(value);
  };

  useEffect(() => {
    // Function to fetch locations from the backend
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/location/',
          { withCredentials: true }
        );
        const locationOptions = response.data.map((loc: any) => ({
          value: loc.uid.toString(),
          label: loc.address,
        }));
        setLocations(locationOptions);
      } catch (error) {
        console.error('Failed to fetch locations', error);
      }
    };

    fetchLocations();
  }, []);

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

  const handleRelocation = async () => {
    if (!changedLocation) {
      notifications.show({
        title: 'Error',
        message: 'Please select a location to change.',
        color: 'red',
      });
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/vehicle/${vehicleId}/relocate`,
        { location: changedLocation },
        { withCredentials: true }
      );
      if (response.status === 200) {
        notifications.show({
          title: 'Success',
          message: 'Vehicle location updated successfully!',
          color: 'green',
        });
        const locationResponse = await axios.get(
          `http://localhost:3000/api/v1/location/${changedLocation}`,
          { withCredentials: true }
        );
        setLocationName(locationResponse.data.address);
      }
    } catch (error) {
      console.error('Failed to relocate vehicle', error);
      notifications.show({
        title: 'Error',
        message: 'Already in this location.',
        color: 'red',
      });
    }
  };

  if (!vehicle || !selectedLocation) {
    return <Text>Loading vehicle data...</Text>;
  }

  return (
    <MantineProvider>
      <Notifications />
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
              <Text td='underline' size='xl'>
                Change Location
              </Text>
              <Space h='xs' />
              <Flex align='center' gap='md'>
                <Select
                  placeholder='Choose'
                  value={changedLocation}
                  onChange={(value) => handleLocationChange(value)}
                  data={locations}
                  searchable
                  nothingFoundMessage='Nothing found...'
                  size='md'
                />
                <Button size='md' onClick={handleRelocation}>
                  Change
                </Button>
              </Flex>
            </Flex>
          </SimpleGrid>
        </Container>
      </Box>
    </MantineProvider>
  );
};

export default VendorCarDetailsPage;
