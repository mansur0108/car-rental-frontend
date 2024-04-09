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
import FiltersSection from '../components/FiltersSection';
import classes from './CarSelectPage.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

type Vehicle = {
  uid: number;
  locationId?: number;
  make: string;
  model: string;
  year: number;
  axles: number;
  doors: number;
  bodyType: string;
  rentCostPerDay: number;
  color: string;
  isRented: boolean;
};

const CarSelectPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { location: selectedLocation } = location.state as { location: string };

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/location/${selectedLocation}/vehicles`
        );
        setVehicles(response.data);
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
        <Container style={{ paddingTop: '100px' }} fluid>
          {/* Back button */}
          <Button variant='outline' onClick={() => navigate('/dashboard')}>
            Back
          </Button>
        </Container>
        <Header />
        {/* Main layout container */}
        <Container style={{ paddingTop: '25px' }} fluid>
          <Flex>
            {/* Left side container for filter */}
            <Flex flex={1} direction='column' style={{ marginLeft: '100px' }}>
              <FiltersSection />
            </Flex>

            {/* Right side container for the Grid */}
            <Flex flex={5} direction='column' style={{ marginLeft: '35px' }}>
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
                    <FeaturesCard vehicle={vehicle} />
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

export default CarSelectPage;
