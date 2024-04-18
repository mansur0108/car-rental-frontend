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
  TextInput,
  LoadingOverlay,
  Textarea,
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
  const [returnedLocation, setReturnedLocation] = useState<string | null>(null);
  const [returningVehicle, setReturningVehicle] = useState<boolean>(false);
  const { location: selectedLocation, vehicleId } = location.state as {
    location: string;
    vehicleId: number;
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

  const relocateVehicle = async (newLocation: string | null) =>{
    await axios({
      method: "post",
      url: `http://localhost:3000/api/v1/vehicle/${vehicle.uid}/relocate`,
      withCredentials: true,
      data: {
        "location": newLocation
      }
    });
  };

  const handleRelocateVehicle = async (newLocation: string | null) =>{
    console.log(`Relocate to location: ${JSON.stringify(newLocation)}`);

    // make sure a location was selected
    if (newLocation === undefined) {
      alert("You must specify a return location for the vehicle");
      return;
    }
    // show loading screen
    setReturningVehicle(true);

    await relocateVehicle(newLocation);
    
    // hide loading screen
    setReturningVehicle(false);

    //const location = location
    navigate('/vendorcardetail', {
      state: {
        location: newLocation!, // force non-null
        vehicleId: vehicle.uid,
      },
    });

    // scroll to top
    window.scrollTo(0, 0);
  };

  const handleVehicleReturnClick = async (newLocation: string | null) =>{
    // make sure a location was selected
    if (location === undefined) {
      alert("You must specify a return location for the vehicle");
      return;
    }
    // show loading screen
    setReturningVehicle(true);

    await relocateVehicle(newLocation);

    try {
      await axios({
        method: "delete",
        url: `http://localhost:3000/api/v1/vehicle/${vehicle.uid}/rent`,
        withCredentials: true,
      });
    } catch (error) {
      console.error('Failed to fetch locations', JSON.stringify(error));
    }

    // hide loading screen
    setReturningVehicle(false);

    navigate('/vendorcardetail', {
      state: {
        location: location!, // force non-null
        vehicleId: vehicle.uid,
      },
    });

    // scroll to top
    window.scrollTo(0, 0);
  };

  if (!vehicle || !selectedLocation) {
    return <Text>Loading vehicle data...</Text>;
  }

  const availabilityText = vehicle.isRented ? "Rented" : "Available";

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
          <LoadingOverlay visible={returningVehicle} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />

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
                  Pickup Location
                </Text>
                <Text>{locationName}</Text>
                
                <Divider my='xs' />
                <Text size="lg">Vehicle availability: {availabilityText}</Text>
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
                visibility: vehicle.isRented ? "visible" : "collapse"
              }}
            >
              <Title order={2}>Return Vehicle</Title>
              <Divider my='xs' />
              <Select
                label="Return Location"
                placeholder='Location'
                value={returnedLocation}
                onChange={(value) => setReturnedLocation(value)}
                data={locations}
                searchable
                nothingFoundMessage='Nothing found...'
              />
              <TextInput label="Maintenance Costs" placeholder="$0.00" />
              <Textarea label="Condition" />
              <Space my="xs" />
              <Button onClick={() => handleVehicleReturnClick(returnedLocation)}>Return Vehicle</Button>
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

              <Flex direction='column' align='flex-start'>
                <Text td='underline' size='xl'>
                  Relocate Vehicle
                </Text>

                <Select
                  label="Location"
                  placeholder='New location'
                  value={returnedLocation}
                  onChange={(value) => handleRelocateVehicle(value)}
                  data={locations}
                  searchable
                  nothingFoundMessage='Nothing found...'
                />
                <Space my="sm" />
              </Flex>

              <Flex
                direction='column'
                align='flex-start'
                style={{
                  // only show when the vehicle is not rented
                  visibility: vehicle.isRented ? "collapse" : "visible"
                }}
              >
                <Text td='underline' size='xl'>
                  Create Reservation
                </Text>

                <TextInput label='First Name' withAsterisk />
                <TextInput label='Last Name' withAsterisk />
                <Button
                  style={{ marginTop: '10px' }}
                  disabled={vehicle.isRented}
                >
                  Reserve
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
