import { Card, Title, Button, Stack, Group, Text, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Layout from '../components/Layout';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <Header />

      <Center>
        <Card
          shadow="lg"
          p="xl"
          radius="md"
          maw={480}
          w="100%"
          withBorder
          mt="xl"
        >
          <Stack gap="md" align="center">
            <Title
              order={2}
              c="yellow.4"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              RGB Game
            </Title>

            <Text
              c="dimmed"
              mb="md"
              fw={700}
              size="lg"
              style={{ letterSpacing: 2 }}
            >
              Customisable divisor game.
            </Text>

            <Group>
              <Button
                color="yellow"
                size="md"
                onClick={() => navigate('/games/new')}
              >
                Create Game
              </Button>
              <Button
                variant="outline"
                color="yellow"
                size="md"
                onClick={() => navigate('/games')}
              >
                View All Games
              </Button>
            </Group>
          </Stack>
        </Card>
      </Center>
    </Layout>
  );
}