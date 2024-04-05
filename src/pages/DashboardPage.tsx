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
      <Header />
      <Box className={classes.imageOverlay}>
        <Image
          src='https://images.unsplash.com/photo-1575147144179-7e23d752d8a9?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          radius='sm'
          h={600}
        ></Image>
      </Box>
      <Container style={{ paddingTop: '60px' }} fluid>
        <Container className={classes.search} fluid>
          <Flex
            className={classes.customFlex}
            direction={{ base: 'column', sm: 'row' }}
            justify='center'
            gap={{ base: 'sm', sm: 'lg' }}
            align={{
              base: 'stretch',
              sm: 'flex-end',
            }}
          >
            <Select
              label='Location'
              placeholder='Choose'
              data={['test1', 'test2', 'test3']}
              searchable
              nothingFoundMessage='Nothing found...'
              size='lg'
            />
            <Select
              label='Class'
              placeholder='Choose'
              data={['All', 'Compact', 'Midsize', 'Standard']}
              searchable
              nothingFoundMessage='Nothing found...'
              size='lg'
            />
            <DateInput
              value={pickupValue}
              onChange={setPickup}
              label='Pick-up'
              placeholder='Date input'
              size='lg'
            />
            <DateInput
              value={returnValue}
              onChange={setReturn}
              label='Return'
              placeholder='Date input'
              size='lg'
            />
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
