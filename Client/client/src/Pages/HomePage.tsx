import { Card, Title, Button, Stack, Group, Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <Group component="header" py="md" px="xl" bg="dark.8" align="center" mb="lg">
        <Title
          order={2}
          style={{
            cursor: 'pointer',
            background: 'linear-gradient(90deg, red, green, blue)',
            /* cast to satisfy TS for vendor‐prefixed props */
            WebkitBackgroundClip: 'text' as any,
            WebkitTextFillColor: 'transparent',
          } as React.CSSProperties}
          onClick={() => navigate('/')}
        >
          RGB Game
        </Title>
        <Group ml="auto">
          <Button variant="subtle" color="yellow" onClick={() => navigate('/games')}>Games</Button>
          <Button variant="subtle" color="yellow" onClick={() => navigate('/games/new')}>Create</Button>
        </Group>
      </Group>

      <Card shadow="lg" p="xl" radius="md" maw={480} mx="auto" mt="xl" withBorder>
        <Stack gap="md" align="center">
          <Title
            order={2}
            style={{
              cursor: 'pointer',
              background: 'linear-gradient(90deg, red, green, blue)',
              /* cast to satisfy TS for vendor‐prefixed props */
              WebkitBackgroundClip: 'text' as any,
              WebkitTextFillColor: 'transparent',
            } as React.CSSProperties}
            onClick={() => navigate('/')}
          >
            RGB Game
          </Title>
          <Text c="dimmed" mb="md" fw={700} size="lg" style={{ letterSpacing: 2 }}>
            Customisable divisor game.
          </Text>
          <Group>
            <Button color="yellow" size="md" onClick={() => navigate('/games/new')}>Create Game</Button>
            <Button variant="outline" color="yellow" size="md" onClick={() => navigate('/games')}>View All Games</Button>
          </Group>
        </Stack>
      </Card>
    </>
  );
}