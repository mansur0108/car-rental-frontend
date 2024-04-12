import React from 'react';
import { Checkbox } from '@mantine/core';

interface SpacedCheckboxProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SpacedCheckbox: React.FC<SpacedCheckboxProps> = ({
  label,
  value,
  onChange,
}) => (
  <Checkbox
    label={label}
    value={value}
    onChange={onChange}
    style={{ marginBottom: '10px' }}
  />
);

export default SpacedCheckbox;
