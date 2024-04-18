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
import { VendorHeader } from '../components/VendorHeader';
import classes from './VendorDashPage.module.css';
import { useNavigate } from 'react-router-dom';

const VendorDashPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [locations, setLocations] = useState<
    Array<{ value: string; label: string }>
  >([]);
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
    navigate('/vendorcars', { state: { location: selectedLocation } }); //Fix Selection Page For Vendor
  };
  const handleLocationChange = (value: string | null) => {
    setSelectedLocation(value);
  };

  return (
    <MantineProvider>
      <VendorHeader /> {/* Display the page header */}
      {/* Overlay image as the dashboard background */}
      <Box className={classes.imageOverlay}>
        <Image
          src='https://cdn.www.nation.com/nation/wp-content/uploads/2018/03/Inside-2017s-Most-Exciting-High-Tech-Cars.jpg'
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
            {/* Search button to trigger the search functionality not implemented yet*/}
            <Button className={classes.button} size='lg' onClick={handleSearch}>
              Search
            </Button>
          </Flex>
        </Container>
      </Container>
    </MantineProvider>
  );
};

export default VendorDashPage;