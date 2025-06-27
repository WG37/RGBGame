import React, { useState, useEffect, JSX } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {startSession, checkValues, nextNumber } from '../Services/api-handler'
import { StartSessionRequest, SessionDto, SessionAnswerDto, CheckValueRequest, } from '../Interfaces/api'
import { Box, Title, TextInput, Button, Group, Table, Loader, Center, Text, } from '@mantine/core'

export default function SessionPage(): JSX.Element {
  const { gameId } = useParams<{ gameId: string }>()
  const navigate = useNavigate()
  const sessionGameId = Number(gameId)

  // declare SessionDto consts
  const [sessionId, setSessionId] = useState<string>('')
  const [currentNumber, setCurrentNumber] = useState<number>(0)
  const [answers, setAnswers] = useState<SessionAnswerDto[]>([])
  const [answer, setAnswer] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const req: StartSessionRequest = { gameId: sessionGameId }
        const s = await startSession(req)
        setSessionId(s.id)
        setCurrentNumber(s.currentNumber)
        setAnswers(s.answers)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [sessionGameId])

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!sessionId) return

    setSubmitting(true)
    setError(null)

    const req: CheckValueRequest = {
      number: currentNumber,
      answer: answer,
    }

    console.log("CheckValues payload:", JSON.stringify(req));

    try {
      const result = await checkValues(sessionId, req)

      // adds new answer to past answers
      setAnswers(prev => [...prev, result])

      try {
        // gets the next number and resets input
        const next = await nextNumber(sessionId)
        setCurrentNumber(next.currentNumber)
        setAnswer('')
      } catch (nextErr: any) {
        // if no numbers left game finished, navigate to results
        if (nextErr.message.includes('No numbers left')) {
          navigate(`/sessions/${sessionId}/results`)
          return
        }
        setError(nextErr.message)
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Center>
    )
  }

  if (!sessionId) {
    return (
      <Center style={{ height: '100vh' }}>
        <Text c="red">Unable to start session.</Text>
      </Center>
    )
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