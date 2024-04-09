import React from 'react';
import { Box, Checkbox, Divider, Text, Title } from '@mantine/core';
import SpacedCheckbox from './SpacedCheckbox';

const FiltersSection = () => {
  return (
    <Box
      p='md'
      w={300}
      style={{
        borderWidth: 1,
        borderColor: '#E9ECEF',
        borderStyle: 'solid',
        borderRadius: 8,
        background: '#fff',
      }}
    >
      <Title order={2}>Filters</Title>
      <Divider my='sm' />

      <Title order={5} style={{ marginBottom: '10px' }}>
        Vehicle Type
      </Title>
      <SpacedCheckbox label='Cars' value='cars' />
      <SpacedCheckbox label='SUVs' value='suvs' />
      <SpacedCheckbox label='Trucks' value='trucks' />
      <SpacedCheckbox label='Vans' value='vans' />
      <Divider my='sm' />

      <Title order={5} style={{ marginBottom: '10px' }}>
        Vehicle Type
      </Title>
      <SpacedCheckbox label='Compact' value='compact' />
      <SpacedCheckbox label='Midsize' value='midsize' />
      <SpacedCheckbox label='Standard' value='standard' />
      <Divider my='sm' />

      <Title order={5} style={{ marginBottom: '10px' }}>
        Seats
      </Title>
      <SpacedCheckbox label='2+' value='2' />
      <SpacedCheckbox label='4+' value='4' />
      <SpacedCheckbox label='5+' value='5' />
      <Divider my='sm' />

      <Title order={5} style={{ marginBottom: '10px' }}>
        Fuel Type
      </Title>
      <SpacedCheckbox label='Gas' value='gas' />
      <SpacedCheckbox label='Electric' value='electric' />
      <SpacedCheckbox label='Hybrid' value='hybrid' />
    </Box>
  );
};

export default FiltersSection;
