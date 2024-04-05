import React, { useState } from 'react';
import {
  MantineProvider,
  Container,
  Button,
  Flex,
  Select,
  Image,
  Box,
} from '@mantine/core';
import { Header } from '../components/Header';
import { DateInput } from '@mantine/dates';
import classes from './Dashboard.module.css';

const DashboardPage: React.FC = () => {
  const [pickupValue, setPickup] = useState<Date | null>(null);
  const [returnValue, setReturn] = useState<Date | null>(null);
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
              data={['test1', 'test2', 'test3']}
              searchable
              nothingFoundMessage='Nothing found...'
              size='lg'
            />
            {/* Car class selection dropdown */}
            <Select
              label='Class'
              placeholder='Choose'
              data={['All', 'Compact', 'Midsize', 'Standard']}
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
            {/* Search button to trigger the search functionality not implemented yet*/}
            <Button className={classes.button} size='lg'>
              Search
            </Button>
          </Flex>
        </Container>
      </Container>
    </MantineProvider>
  );
};

export default DashboardPage;
