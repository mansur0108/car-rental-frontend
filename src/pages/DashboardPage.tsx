import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MantineProvider,
  Container,
  Button,
  Flex,
  Select,
  Image,
  Box,
  // TextInput,
} from '@mantine/core';
import { Header } from '../components/Header';
import { DateInput } from '@mantine/dates';
import classes from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [locations, setLocations] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [pickupValue, setPickup] = useState<Date | null>(null);
  const [returnValue, setReturn] = useState<Date | null>(null);
  const navigate = useNavigate();

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

  const handleSearch = () => {
    navigate('/selection', {
      state: {
        location: selectedLocation,
        pickupDate: pickupValue,
        returnDate: returnValue,
      },
    });
  };
  const handleLocationChange = (value: string | null) => {
    setSelectedLocation(value);
  };

  return (
    <MantineProvider>
      <Header /> {/* Display the page header */}
      {/* Overlay image as the dashboard background */}
      <Box className={classes.imageOverlay}>
        <Image
          src='https://images.unsplash.com/photo-1575147144179-7e23d752d8a9?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          radius='sm'
          h={600}
        ></Image>
      </Box>
      {/* Container for the search functionality */}
      <Container style={{ paddingTop: '60px' }} fluid>
        {/* Inner container with custom styles for search inputs and button */}
        <Container className={classes.search} fluid>
          <Flex
            className={classes.customFlex}
            direction={{ base: 'column', sm: 'row' }} // column in mobile view, row in wider screens
            justify='center' // center the flex items horizontally
            gap={{ base: 'sm', sm: 'lg' }} // Spacing
            align={{
              base: 'stretch',
              sm: 'flex-end',
            }}
          >
            {/* Location selection dropdown */}
            <Select
              label='Location'
              placeholder='Choose'
              value={selectedLocation}
              onChange={(value) => handleLocationChange(value)}
              data={locations}
              searchable
              nothingFoundMessage='Nothing found...'
              size='lg'
            />
            {/* Pickup date input */}
            <DateInput
              value={pickupValue}
              onChange={setPickup}
              label='Pick-up'
              placeholder='Date input'
              size='lg'
            />
            {/* Return date input */}
            <DateInput
              value={returnValue}
              onChange={setReturn}
              label='Return'
              placeholder='Date input'
              size='lg'
            />
            <Button className={classes.button} size='lg' onClick={handleSearch}>
              Search
            </Button>
          </Flex>
        </Container>
      </Container>
    </MantineProvider>
  );
};

export default DashboardPage;
