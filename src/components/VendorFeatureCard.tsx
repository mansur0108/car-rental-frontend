import { Card, Text, Group, Center, Button } from '@mantine/core';
import { IconCar, IconUsers, IconPaint } from '@tabler/icons-react';
import classes from './VendorFeatureCard.module.css';
import { Icon } from '@iconify/react';

interface Vehicle {
  uid: number;
  make: string;
  model: string;
  year: number;
  seats: number;
  doors: number;
  bodyType: string;
  rentCostPerDay: number;
  color: string;
  isRented: boolean;
}

interface Feature {
  label: string;
  icon: React.ReactNode;
}

interface VendorFeaturesCardProps {
  vehicle: Vehicle;
  onSelectClick: () => void;
}

export function VendorFeatureCard({
  vehicle,
  onSelectClick,
}: VendorFeaturesCardProps) {
  const features: Feature[] = [
    {
      label: `${vehicle.seats} seats`,
      icon: <IconUsers size='1.05rem' className={classes.icon} stroke={1.5} />,
    },
    {
      label: `${vehicle.doors} door`,
      icon: (
        <Icon
          icon='mdi:car-door'
          style={{ fontSize: '1.05rem', color: '#ccd1d6' }}
        />
      ),
    },
    {
      label: vehicle.bodyType,
      icon: <IconCar size='1.05rem' className={classes.icon} stroke={1.5} />,
    },
    {
      label: vehicle.color,
      icon: <IconPaint size='1.05rem' className={classes.icon} stroke={1.5} />,
    },
  ];

  const featuresElements = features.map((feature, index) => (
    <Center key={index}>
      {feature.icon}
      <Text size='xs'>{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius='md' className={classes.card}>
      <Group justify='space-between' mt='xs'>
        <div>
          <Text fz='lg' fw={500}>
            {vehicle.make} {vehicle.model}
          </Text>
          <Text fz='sm' c='dimmed'>
            {vehicle.isRented ? 'Reserved' : 'Available'}
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.section} mt='md'>
        <Text fz='sm' c='dimmed' className={classes.label}>
          Basic configuration
        </Text>

        <Group gap={8} mb={-8}>
          {featuresElements}
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Group gap={30}>
          <div>
            <Text fz='xl' fw={700} style={{ lineHeight: 1 }}>
              ${vehicle.rentCostPerDay}
            </Text>
            <Text fz='sm' c='dimmed' fw={500} style={{ lineHeight: 1 }} mt={3}>
              per day
            </Text>
          </div>

          <Button radius='xl' style={{ flex: 1 }} onClick={onSelectClick}>
            Select
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
