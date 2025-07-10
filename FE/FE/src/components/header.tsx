import React from 'react';
import { Group, Title, Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  return (
    <Group component="header" py="md" px="xl" bg="dark.8" align="center" mb="lg">
      <Title order={2} c="yellow.4" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>RGB Game</Title>
      <Group ml="auto">
        <Button variant="subtle" color="yellow" onClick={() => navigate('/games')}>Games</Button>
        <Button variant="subtle" color="yellow" onClick={() => navigate('/games/new')}>Create</Button>
      </Group>
    </Group>
  );
}