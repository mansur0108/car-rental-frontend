import { Card, Image, Text, Group, Badge, Center, Button } from '@mantine/core';
import {
  IconGasStation,
  IconGauge,
  IconCar,
  IconUsers,
  IconPaint,
} from '@tabler/icons-react';
import classes from './FeaturesCard.module.css';

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

interface FeaturesCardProps {
  vehicle: Vehicle;
}

export function FeaturesCard({ vehicle }: FeaturesCardProps) {
  const features = [
    { label: `${vehicle.seats} seats`, icon: IconUsers },
    { label: vehicle.bodyType, icon: IconCar },
    { label: vehicle.color, icon: IconPaint },
    // Add more features
  ].map((feature, index) => (
    <Center key={index}>
      <feature.icon size='1.05rem' className={classes.icon} stroke={1.5} />
      <Text size='xs'>{feature.label}</Text>
    </Center>
  ));

  return (
    <Card withBorder radius='md' className={classes.card}>
      <Group justify='space-between' mt='md'>
        <div>
          <Text fw={500}>
            {vehicle.make} {vehicle.model}
          </Text>
          <Text fz='xs' c='dimmed'>
            Random Text
          </Text>
        </div>
      </Group>

      <Card.Section className={classes.section} mt='md'>
        <Text fz='sm' c='dimmed' className={classes.label}>
          Basic configuration
        </Text>

        <Group gap={8} mb={-8}>
          {features}
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

          <Button radius='xl' style={{ flex: 1 }}>
            Rent now
          </Button>
        </Group>
      </Card.Section>
    </Card>
  );
}
