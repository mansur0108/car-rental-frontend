import React, { useState } from 'react';
import {
  MantineProvider,
  Container,
  Button,
  Flex,
  Select,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import classes from './Dashboard.module.css';

const DashboardPage: React.FC = () => {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <MantineProvider>
      <Container>
        <Container className={classes.search} fluid>
          <Flex
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
            />
            <Select
              label='Make'
              placeholder='Choose'
              data={['All', 'Toyota', 'Nissan', 'Honda']}
              searchable
              nothingFoundMessage='Nothing found...'
            />
            <DateInput
              value={value}
              onChange={setValue}
              label='Date input'
              placeholder='Date input'
            />
            <Button>Search</Button>
          </Flex>
        </Container>
      </Container>
    </MantineProvider>
  );
};

export default DashboardPage;
