import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGames, deleteGame } from '../services/Api';
import { Button, Title, Loader, Center, Group, Table, Modal, Text, Box } from '@mantine/core';
import type { GameDto } from '../interfaces/GameDto';
import Header from '../components/Header';
import Layout from '../components/Layout';

export default function GameList() {
  const [games, setGames] = useState<GameDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        const all = await getAllGames();
        setGames(all);
      } catch (error) {
        console.error('Failed to fetch game data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  const handleDelete = async () => {
    if (deletingId === null) return;
    try {
      await deleteGame(deletingId);
      setGames(prev => prev.filter(g => g.id !== deletingId));
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setModalOpen(false);
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

return (
  <Layout>
    <Header />

    <Box>
      <Group justify="apart" mb="md">
        <Title order={2}>All Games</Title>
        <Button onClick={() => navigate('/games/new')}>New Game</Button>
      </Group>

      {loading ? (
        <Center>
          <Loader size="md" />
        </Center>
      ) : (
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Min</th>
              <th>Max</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((game) => (
              <tr key={game.id}>
                <td>{game.name}</td>
                <td>{game.author}</td>
                <td>{game.minRange}</td>
                <td>{game.maxRange}</td>
                <td style={{ textAlign: 'center' }}>
                  <Group gap="xs" justify="center">
                    <Button size="xs" onClick={() => navigate(`/play/${game.id}`)}>
                      Play
                    </Button>
                    <Button size="xs" onClick={() => navigate(`/games/${game.id}/update`)}>
                      Edit
                    </Button>
                    <Button
                      color="red"
                      size="xs"
                      onClick={() => {
                        setDeletingId(game.id);
                        setModalOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Delete"
      >
        <Text>Are you sure you want to delete? This cannot be undone.</Text>
        <Group justify="right" mt="md">
          <Button variant="outline" size="xs" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button color="red" size="xs" onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      </Modal>
    </Box>
  </Layout>
  );
}