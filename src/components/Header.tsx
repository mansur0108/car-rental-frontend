import classes from './Header.module.css';
import { Text } from '@mantine/core';

export function Header() {
  return (
    <header className={classes.header}>
      <Text style={{ fontSize: '28px', fontWeight: 'bold' }}>OnTheGo</Text>
    </header>
  );
}
