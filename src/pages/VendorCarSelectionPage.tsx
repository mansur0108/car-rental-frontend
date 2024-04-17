import React, { useState } from 'react';
import {
  Container,
  MantineProvider,
  Grid,
  Flex,
  Box,
  Button,
} from '@mantine/core';
import axios from 'axios';
import { Header } from '../components/Header';
import { FeaturesCard } from '../components/FeaturesCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { VendorFeatureCard } from '../components/VendorFeatureCard';

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

  const handleSelect = (vehicle: Vehicle) => {
    navigate('/vendorcardetail', {
      state: {
        location: selectedLocation,
        vehicleId: vehicle.uid,
      },
    });
  };
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/location/${selectedLocation}/vehicles`,
          { withCredentials: true }
        );

        const availableVehicles = response.data.filter(
          (vehicle: Vehicle) => !vehicle.isRented
        );
        setVehicles(availableVehicles);
      } catch (error) {
        console.error('Failed to fetch vehicles', error);
      }
    };

    if (selectedLocation) {
      fetchVehicles();
    }
  }, [selectedLocation]);

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
