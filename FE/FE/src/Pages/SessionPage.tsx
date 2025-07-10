import React, { JSX, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import header from '../components/Header';
import AnswerForm from '../components/AnswerForm';
import SessionTable from '../components/SessionTable';
import { startSession, checkValues, nextNumber } from '../services/';
import {
  StartSessionRequest,
  SessionDto,
  SessionAnswerDto,
  CheckValueRequest,
} from '../interfaces/session';
import {
  Box,
  Title,
  Loader,
  Center,
  Text,
  Alert,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

export default function SessionPage(): JSX.Element {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const sessionGameId = Number(gameId);

  const [sessionId, setSessionId] = useState<string>('');
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [answers, setAnswers] = useState<SessionAnswerDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSession();
  }, [sessionGameId]);

  async function loadSession() {
    setLoading(true);
    setError(null);
    try {
      const req: StartSessionRequest = { gameId: sessionGameId };
      const session: SessionDto = await startSession(req);

      setSessionId(session.id);
      setCurrentNumber(session.currentNumber);
      setAnswers(session.answers);
    } catch (err: any) {
      setError(err.message || 'Failed to start session');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(answerValue: string) {
    if (!sessionId) return;
    setSubmitting(true);
    setError(null);

    const req: CheckValueRequest = { number: currentNumber, answer: answerValue };

    try {
      const result = await checkValues(sessionId, req);
      setAnswers(prev => [...prev, result]);

      const next = await nextNumber(sessionId);
      setCurrentNumber(next.currentNumber);
    } catch (err: any) {
      if (err.message.includes('No numbers left')) {
        navigate(`/sessions/${sessionId}/results`);
        return;
      }
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!sessionId) {
    return (
      <Center style={{ height: '100vh' }}>
        <Text color="red">Unable to start session.</Text>
      </Center>
    );
  }

  return (
    <Box p="lg">
      <Header />

      <Title order={3} mb="md">
        Current Number: {currentNumber}
      </Title>

      {error && (
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Error"
          color="red"
          mb="md"
        >
          {error}
        </Alert>
      )}

      <AnswerForm
        answer={''}
        isSubmitting={submitting}
        onSubmit={handleSubmit}
      />

      <SessionTable answers={answers} />
    </Box>
  );
}

  return (
    <>
      <Group
        component="header"
        py="md"
        px="xl"
        bg="dark.8"
        align="center"
        mb="lg"
      >
        <Title
          order={2}
          c="yellow.4"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          RGB Game
        </Title>
        <Group ml="auto">
          <Button
            variant="subtle"
            color="yellow"
            onClick={() => navigate('/games')}
          >
            Games
          </Button>
          <Button
            variant="subtle"
            color="yellow"
            onClick={() => navigate('/games/new')}
          >
            Create
          </Button>
        </Group>
      </Group>

      <Box maw={600} mx="auto" p="md">
        <Title order={3} mb="md">
          Playing Game #{sessionGameId}
        </Title>

        {error && (
          <Text c="red" mb="sm">
            {error}
          </Text>
        )}

        <Text mb="sm">Current number: {currentNumber}</Text>

        <form onSubmit={handleSubmit}>
          <Group mb="md">
            <TextInput
              label="Your answer"
              value={answer}
              onChange={(e) => setAnswer(e.currentTarget.value)}
              disabled={submitting}
              required
              flex={1}
            />
            <Button type="submit" loading={submitting}>
              Submit
            </Button>
          </Group>
        </form>

        <Title order={4} mb="sm">
          Past Answers
        </Title>

        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>Number</th>
              <th>Your Answer</th>
              <th>Correct?</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((ans) => (
              <tr key={ans.id}>
                <td>{ans.number}</td>
                <td>{ans.answerSubmission}</td>
                <td>{ans.isCorrect ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </>
  )
}