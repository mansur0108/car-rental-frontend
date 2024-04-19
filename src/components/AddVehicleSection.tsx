import React, { useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Title,
  TextInput,
  Select,
  Button,
} from '@mantine/core';
import axios from 'axios';

interface AddVehicleSectionProps {
  locationId: string;
  onVehicleAdded: () => void;
}

const AddVehicleSection: React.FC<AddVehicleSectionProps> = ({
  locationId,
  onVehicleAdded,
}) => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [type, setType] = useState<string | null>(null);
  const [seats, setSeats] = useState('');
  const [doors, setDoors] = useState('');
  const [color, setColor] = useState('');
  const [cost, setCost] = useState('');

  const isFormComplete =
    make && model && year && type && seats && doors && color && cost;

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/location/${locationId}/vehicles`,
        {
          make,
          model,
          year: parseInt(year),
          bodyType: type,
          seats: parseInt(seats),
          doors: parseInt(doors),
          color,
          rentCostPerDay: parseFloat(cost),
        },
        { withCredentials: true }
      );
      console.log('Vehicle added successfully:', response.data);
      setMake('');
      setModel('');
      setYear('');
      setType(null);
      setSeats('');
      setDoors('');
      setColor('');
      setCost('');
      onVehicleAdded();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('Error adding vehicle');
      }
    }
  };
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
      <Title order={2}>Add Vehicle</Title>
      <Divider my='sm' />

      <Flex direction='column' gap='sm'>
        <TextInput
          label='Make'
          value={make}
          onChange={(event) => setMake(event.currentTarget.value)}
        />
        <TextInput
          label='Model'
          value={model}
          onChange={(event) => setModel(event.currentTarget.value)}
        />
      </Flex>
      <Flex gap='sm'>
        <TextInput
          label='Year'
          value={year}
          onChange={(event) => setYear(event.currentTarget.value)}
        />
        <Select
          style={{ width: '70%' }}
          label='Type'
          value={type}
          onChange={(value) => setType(value)}
          data={['Compact', 'Midsize', 'Standard']}
          placeholder='Select Type'
        />
      </Flex>
      <Flex gap='sm'>
        <TextInput
          label='Seats'
          value={seats}
          onChange={(event) => setSeats(event.currentTarget.value)}
        />
        <TextInput
          label='Doors'
          value={doors}
          onChange={(event) => setDoors(event.currentTarget.value)}
        />
      </Flex>
      <Flex gap='sm'>
        <TextInput
          label='Color'
          value={color}
          onChange={(event) => setColor(event.currentTarget.value)}
        />
        <TextInput
          label='Cost'
          value={cost}
          onChange={(event) => setCost(event.currentTarget.value)}
        />
      </Flex>
      <Button
        style={{ marginTop: '15px' }}
        disabled={!isFormComplete}
        onClick={handleSubmit}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddVehicleSection;
