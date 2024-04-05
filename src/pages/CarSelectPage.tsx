import {
  Container,
  MantineProvider,
  SimpleGrid,
  Grid,
  Flex,
  Box,
} from '@mantine/core';
import { Header } from '../components/Header';
import { FeaturesCard } from '../components/FeaturesCard';
import classes from './CarSelectPage.module.css';

const CarSelectPage: React.FC = () => {
  return (
    <MantineProvider>
      <Header />
      <Grid justify='space-around'>
        <Grid.Col style={{ maxWidth: 350 }} span={{ sm: 4, xs: 4 }}>
          <FeaturesCard />
        </Grid.Col>
        <Grid.Col style={{ maxWidth: 350 }} span={{ sm: 4, xs: 4 }}>
          <FeaturesCard />
        </Grid.Col>
        <Grid.Col style={{ maxWidth: 350 }} span={{ sm: 4, xs: 4 }}>
          <FeaturesCard />
        </Grid.Col>
      </Grid>
    </MantineProvider>
  );
};

export default CarSelectPage;
