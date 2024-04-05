import classes from './Header.module.css';
import { Text } from '@mantine/core';

export function Header() {
  return (
    <header className={classes.header}>
      <Text fz='lg' fw='bold'>
        OnTheGo
      </Text>
    </header>
  );
}
