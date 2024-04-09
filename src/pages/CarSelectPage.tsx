import { Container, MantineProvider, Grid, Flex, Box } from '@mantine/core';
import { Header } from '../components/Header';
import { FeaturesCard } from '../components/FeaturesCard';
import FiltersSection from '../components/FiltersSection';
import classes from './CarSelectPage.module.css';

const CarSelectPage: React.FC = () => {
  return (
    <MantineProvider>
      <Box style={{ backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
        <Header />
        {/* Main layout container */}
        <Container style={{ paddingTop: '100px' }} fluid>
          <Flex>
            {/* Left side container for filter */}
            <Flex flex={1} direction='column' style={{ marginLeft: '100px' }}>
              <FiltersSection />
            </Flex>

            {/* Right side container for the Grid */}
            <Flex flex={5} direction='column'>
              <Grid
                gutter={{ base: 10, xs: 'lg', md: 'xl', xl: 80 }}
                justify='center'
              >
                <Grid.Col style={{ maxWidth: 375 }} span={{ sm: 4, xs: 4 }}>
                  <FeaturesCard />
                </Grid.Col>
                <Grid.Col style={{ maxWidth: 375 }} span={{ sm: 4, xs: 4 }}>
                  <FeaturesCard />
                </Grid.Col>
                <Grid.Col style={{ maxWidth: 375 }} span={{ sm: 4, xs: 4 }}>
                  <FeaturesCard />
                </Grid.Col>
                <Grid.Col style={{ maxWidth: 375 }} span={{ sm: 4, xs: 4 }}>
                  <FeaturesCard />
                </Grid.Col>
                <Grid.Col style={{ maxWidth: 375 }} span={{ sm: 4, xs: 4 }}>
                  <FeaturesCard />
                </Grid.Col>
                <Grid.Col style={{ maxWidth: 375 }} span={{ sm: 4, xs: 4 }}>
                  <FeaturesCard />
                </Grid.Col>
              </Grid>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </MantineProvider>
  );
};

export default CarSelectPage;
