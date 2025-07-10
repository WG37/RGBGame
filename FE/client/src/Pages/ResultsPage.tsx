import React, { useState, useEffect, JSX } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getResults } from '../Services/api-handler';
import { SessionDto, SessionAnswerDto } from '../Interfaces/api';
import { Box, Title, Table, Group, Button, Loader, Center, Text } from '@mantine/core';

export default function ResultsPage(): JSX.Element{
    const { sessionId } = useParams<{ sessionId: string }>();
    const navigate = useNavigate();
    const [session, setSession ] = useState<SessionDto | null>(null);
    const [loading, setLoading ] = useState(true);
    const [error, setError ] = useState<string | null>(null);

    useEffect(() => {
        if (!sessionId) return;
        (async () => {
            try {
                const res = await getResults(sessionId);
                setSession(res);
            } catch (err : any) {
                setError(err.Message);
            } finally {
                setLoading(false);
            }
        })();
    }, [sessionId]);

    if (loading) { 
        return (
          <Center style={{height: '100vh'}}>
            <Loader size="lg" />
          </Center>
        );
    }

    if (error || !session) {
        return (
            <Center style={{heaight: '100vh'}}>
                <Text c="red">Failed to load game results</Text>
            </Center>
        );
    }

      return (
    <>
      <Group component="header" py="md" px="xl" bg="dark.8" align="center" mb="lg">
        <Title
          order={2}
          c="yellow.4"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          RGB Game
        </Title>
        <Group ml="auto">
          <Button variant="subtle" color="yellow" onClick={() => navigate('/games')}>Games</Button>
          <Button variant="subtle" color="yellow" onClick={() => navigate('/games/new')}>Create</Button>
        </Group>
      </Group>

      <Box maw={700} mx="auto" p="md">
        <Title order={3} mb="md">
          Session Results for Game #{session.gameId}
        </Title>

        <Group gap="xl" mb="md">
          <Text>Total Questions: {session.answers.length}</Text>
          <Text>Correct: {session.correctTotal}</Text>
          <Text>Incorrect: {session.incorrectTotal}</Text>
        </Group>

        <Title order={4} mb="sm">Answer Breakdown</Title>
        <Table striped highlightOnHover verticalSpacing="sm">
          <thead>
            <tr>
              <th>Number</th>
              <th>Your Answer</th>
              <th>Expected</th>
              <th>Correct?</th>
            </tr>
          </thead>
          <tbody>
            {session.answers.map((ans: SessionAnswerDto) => (
              <tr key={ans.id}>
                <td>{ans.number}</td>
                <td>{ans.answerSubmission}</td>
                <td>{ans.expectedAnswer}</td>
                <td>{ans.isCorrect ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Group justify="right" mt="lg">
          <Button variant="outline" onClick={() => navigate('/games')}>Back to Games</Button>
          <Button onClick={() => navigate(`/play/${session.gameId}`)}>Play Again</Button>
        </Group>
      </Box>
    </>
  );
}