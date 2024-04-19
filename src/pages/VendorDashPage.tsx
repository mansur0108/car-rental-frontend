import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  MantineProvider,
  Button,
  Flex,
  Select,
  Image,
  Box,
  TextInput,
  Space,
} from '@mantine/core';
import { VendorHeader } from '../components/VendorHeader';
import { useNavigate } from 'react-router-dom';
import { Notifications, notifications } from '@mantine/notifications';

const VendorDashPage: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [locations, setLocations] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [newLocation, setNewLocation] = useState('');
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

  const handleAddLocation = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/location/',
        { address: newLocation },
        { withCredentials: true }
      );
      notifications.show({
        title: 'Success!',
        message: 'Added new location.',
        color: 'green',
      });
      setLocations([
        ...locations,
        { value: response.data.uid.toString(), label: response.data.address },
      ]);
      setNewLocation('');
    } catch (error) {
      console.error('Failed to add location:', error);
      alert('Failed to add location. Please try again later.');
    }
  };

  const handleSearch = () => {
    navigate('/vendorcars', { state: { location: selectedLocation } }); //Fix Selection Page For Vendor
  };
  const handleLocationChange = (value: string | null) => {
    setSelectedLocation(value);
  };

  return (
    <MantineProvider>
      <Notifications />
      <VendorHeader /> {/* Display the page header */}
      {/* Overlay image as the dashboard background */}
      <Box style={{ position: 'relative' }}>
        <Image
          src='https://cdn.www.nation.com/nation/wp-content/uploads/2018/03/Inside-2017s-Most-Exciting-High-Tech-Cars.jpg'
          radius='sm'
          h={600}
        ></Image>
      </Box>
      <Flex style={{ marginTop: '-100px' }} justify='center'>
        <Box
          p='md'
          w={420}
          style={{
            borderWidth: 1,
            borderColor: '#E9ECEF',
            borderStyle: 'solid',
            borderRadius: 8,
            background: '#fff',
            zIndex: '1',
          }}
        >
          <Flex gap='sm'>
            <TextInput
              w='70%'
              size='lg'
              label='Add New Location'
              value={newLocation}
              onChange={(e) => setNewLocation(e.currentTarget.value)}
            />
            <Button
              w='28%'
              style={{ marginTop: '28px' }}
              size='lg'
              onClick={handleAddLocation}
            >
              Add
            </Button>
          </Flex>
          <Space h='sm' />
          <Flex gap='sm'>
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
            <Button
              style={{ marginTop: '28px' }}
              size='lg'
              onClick={handleSearch}
            >
              Search
            </Button>
          </Flex>
        </Box>
      </Flex>
    </MantineProvider>
  );
};

export default VendorDashPage;
