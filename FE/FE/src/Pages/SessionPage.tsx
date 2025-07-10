import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AnswerForm from '../components/AnswerForm';
import SessionTable from '../components/SessionTable';
import { startSession, checkValues, nextNumber } from '../services/api';
import {
  StartSessionRequest,
  SessionDto,
  SessionAnswerDto,
  CheckValueRequest,
} from '../interfaces/session';
import { Box, Title, Loader, Center, Text, Alert } from '@mantine/core';

export default function SessionPage(): JSX.Element {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const sessionGameId = Number(gameId);

  const [sessionId, setSessionId] = useState<string>('');
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [answers, setAnswers] = useState<SessionAnswerDto[]>([]);
  const [answer, setAnswer] = useState<string>('');
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

  async function handleSubmit(value: string) {
    if (!sessionId) return;
    setSubmitting(true);
    setError(null);

    const req: CheckValueRequest = { number: currentNumber, answer: value };

    try {
      const result = await checkValues(sessionId, req);
      setAnswers(prev => [...prev, result]);
      const next = await nextNumber(sessionId);
      setCurrentNumber(next.currentNumber);
      setAnswer('');
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
        Playing Game #{sessionGameId}
      </Title>

      {error && (
        <Alert title="Error" color="red" mb="md">
          {error}
        </Alert>
      )}

      <Text mb="sm">Current Number: {currentNumber}</Text>

      <AnswerForm
        answer={answer}
        isSubmitting={submitting}
        onAnswerChange={setAnswer}
        onSubmit={handleSubmit}
      />

      <Title order={4} mt="lg" mb="sm">
        Past Answers
      </Title>

      <SessionTable answers={answers} />
    </Box>
  );
}