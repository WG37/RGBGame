import React, { useEffect, useState, JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllGames, deleteGame } from '../Services/api-handler';
import { Button, Title, Loader, Center, Group, Table, Modal, Text } from '@mantine/core';
import { GameDto } from '../Interfaces/api';

export default function GameList() {
  const [games, setGames] = useState<GameDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const all = await getAllGames();
        setGames(all);
      } catch (error) {
        console.error('Failed to fetch game data:', error);
      } finally {
        setLoading(false);
      }
    })();
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

      <div style={{ padding: 20 }}>
        <Group justify="apart" style={{ marginBottom: 20 }}>
          <Title order={2}>All Games</Title>
          <Button onClick={() => navigate('/games/new')}>New Game</Button>
        </Group>

        <Table.ScrollContainer minWidth={600}>
          <Table highlightOnHover verticalSpacing="xs">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Author</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {games.map(game => (
                <Table.Tr key={game.id}>
                  <Table.Td>{game.name}</Table.Td>
                  <Table.Td>{game.author}</Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => navigate(`/games/${game.id}/update`)}
                      >
                        Edit
                      </Button>
                      <Button size="xs" onClick={() => navigate(`/play/${game.id}`)}>Play</Button>
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
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>

        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm Delete"
        >
          <Text>Are you sure you want to delete? Cannot be undone.</Text>
          <Group justify="right" mt="md">
            <Button variant="outline" size="xs" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button color="red" size="xs" onClick={handleDelete}>Delete</Button>
          </Group>
        </Modal>
      </div>
    </>
  );
}
