import React from 'react';
import { Box, Divider, Text, Title } from '@mantine/core';
import SpacedCheckbox from './SpacedCheckbox';

interface FiltersSectionProps {
  onSeatsChange: (seats: number | null) => void;
  onTypeChange: (type: string | null) => void;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
  onSeatsChange,
  onTypeChange,
}) => {
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

      {/* <Title order={5} style={{ marginBottom: '10px' }}>
        Vehicle Type
      </Title>
      <SpacedCheckbox label='Cars' value='cars' />
      <SpacedCheckbox label='SUVs' value='suvs' />
      <SpacedCheckbox label='Trucks' value='trucks' />
      <SpacedCheckbox label='Vans' value='vans' />
      <Divider my='sm' /> */}

      <Title order={5} style={{ marginBottom: '10px' }}>
        Vehicle Type
      </Title>
      <SpacedCheckbox
        label='Compact'
        value='compact'
        onChange={(e) => onTypeChange(e.target.checked ? 'compact' : null)}
      />
      <SpacedCheckbox
        label='Midsize'
        value='midsize'
        onChange={(e) => onTypeChange(e.target.checked ? 'midsize' : null)}
      />
      <SpacedCheckbox
        label='Standard'
        value='standard'
        onChange={(e) => onTypeChange(e.target.checked ? 'standard' : null)}
      />
      <Divider my='sm' />

      <Title order={5} style={{ marginBottom: '10px' }}>
        Seats
      </Title>
      <SpacedCheckbox
        label='2+'
        value='2'
        onChange={(e) => onSeatsChange(e.target.checked ? 2 : null)}
      />
      <SpacedCheckbox
        label='4+'
        value='4'
        onChange={(e) => onSeatsChange(e.target.checked ? 4 : null)}
      />
      <SpacedCheckbox
        label='5+'
        value='5'
        onChange={(e) => onSeatsChange(e.target.checked ? 5 : null)}
      />
      {/* <Divider my='sm' /> */}

      {/* <Title order={5} style={{ marginBottom: '10px' }}>
        Fuel Type
      </Title>
      <SpacedCheckbox label='Gas' value='gas' onChange={() => onTypeChange('gas')}/>
      <SpacedCheckbox label='Electric' value='electric' onChange={() => onTypeChange('electric')}/>
      <SpacedCheckbox label='Hybrid' value='hybrid' onChange={() => onTypeChange('hybrid')}/> */}
    </Box>
  );
};

export default FiltersSection;
