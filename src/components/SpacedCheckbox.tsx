import React from 'react';
import { Checkbox } from '@mantine/core';

interface SpacedCheckboxProps {
  label: string;
  value: string | number;
}

const SpacedCheckbox: React.FC<SpacedCheckboxProps> = ({ label, value }) => (
  <Checkbox label={label} value={value} style={{ marginBottom: '10px' }} />
);

export default SpacedCheckbox;
