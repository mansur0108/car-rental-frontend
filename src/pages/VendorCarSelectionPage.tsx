import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  MantineProvider,
  Grid,
  Flex,
  Box,
  Button,
} from '@mantine/core';
import axios from 'axios';
import AddVehicleSection from '../components/AddVehicleSection';
import { Header } from '../components/Header';
import { VendorFeatureCard } from '../components/VendorFeatureCard';
import { useNavigate, useLocation } from 'react-router-dom';

type Vehicle = {
  uid: number;
  locationId?: number;
  make: string;
  model: string;
  year: number;
  seats: number;
  doors: number;
  bodyType: string;
  rentCostPerDay: number;
  color: string;
  isRented: boolean;
};

const VendorCarSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { location: selectedLocation } = location.state as {
    location: string;
  };

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const fetchVehicles = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/location/${selectedLocation}/vehicles?includeRented=true`,
        { withCredentials: true }
      );
      setVehicles(response.data);
    } catch (error) {
      console.error('Failed to fetch vehicles', error);
    }
  }, [selectedLocation]);

  const handleSelect = (vehicle: Vehicle) => {
    navigate('/vendorcardetail', {
      state: {
        location: selectedLocation,
        vehicleId: vehicle.uid,
      },
    });
  };
  const handleVehicleAdded = () => {
    fetchVehicles(); // Call fetchVehicles to reload the vehicle list
  };

  useEffect(() => {
    if (selectedLocation) {
      fetchVehicles();
    }
  }, [selectedLocation, fetchVehicles]);

  return (
    <MantineProvider>
      <Box style={{ backgroundColor: '#fafafa', minHeight: '100vh' }}>
        <Header />
        <Container style={{ paddingTop: '100px', paddingBottom: '25px' }} fluid>
          {/* Back button */}
          <Button variant='outline' onClick={() => navigate('/vendash')}>
            Back
          </Button>
        </Container>

        {/* Main layout container */}
        <Container fluid>
          <Flex>
            <Flex flex={1} direction='column'>
              <AddVehicleSection
                locationId={selectedLocation}
                onVehicleAdded={handleVehicleAdded}
              />
            </Flex>
            {/* Right side container for the Grid */}
            <Flex flex={5} direction='column' style={{ marginLeft: '15px' }}>
              <Grid
                gutter={{ base: 10, xs: 'lg', md: 'xl', xl: 80 }}
                justify='flex-start'
              >
                {vehicles.map((vehicle) => (
                  <Grid.Col
                    style={{ maxWidth: 375 }}
                    span={{ sm: 4, xs: 4 }}
                    key={vehicle.uid}
                  >
                    <VendorFeatureCard
                      vehicle={vehicle}
                      onSelectClick={() => handleSelect(vehicle)}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </MantineProvider>
  );
};

export default VendorCarSelectionPage;
