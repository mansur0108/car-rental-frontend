import React from 'react';
import { Box, Divider, Title } from '@mantine/core';
import SpacedCheckbox from './SpacedCheckbox';

interface FiltersSectionProps {
  onSeatsChange: (seats: number | null) => void;
  onTypeChange: (type: string, isChecked: boolean) => void;
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

      <Title order={5} style={{ marginBottom: '10px' }}>
        Vehicle Type
      </Title>
      <SpacedCheckbox
        label='Compact'
        value='compact'
        onChange={(e) => onTypeChange('compact', e.target.checked)}
      />
      <SpacedCheckbox
        label='Midsize'
        value='midsize'
        onChange={(e) => onTypeChange('midsize', e.target.checked)}
      />
      <SpacedCheckbox
        label='Standard'
        value='standard'
        onChange={(e) => onTypeChange('standard', e.target.checked)}
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
    </Box>
  );
};

export default FiltersSection;
