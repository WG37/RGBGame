import React, { useState, useEffect, JSX } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getGameById, updateGame } from '../Services/api-handler';
import { UpdateGameDto, RuleDto } from '../Interfaces/api';
import { Box, Title, TextInput, NumberInput, Button, Group, Text, Loader, Center, Stack, Card } from '@mantine/core';

export default function UpdateGamePage(): JSX.Element {
    const {id} = useParams<{id: string}>();             // id into string because of url params
    const gameId = id ? parseInt(id, 10) : NaN;         // convert id into int after route
    const navigate = useNavigate();

     const [form, setForm] = useState<UpdateGameDto>({
    name: '',
    author: '',
    minRange: 1,
    maxRange: 100,
    rules: [],
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    (async () => {
      try {
        const game = await getGameById(gameId);
        setForm({
          name: game.name,
          author: game.author,
          minRange: game.minRange,
          maxRange: game.maxRange,
          rules: game.rules.map(r => ({ divisor: r.divisor, word: r.word })),
        });
      } catch (err: any) {
        setError(err.message || 'Unable to load game');
      } finally {
        setLoading(false);
      }
    })();
  }, [gameId, id]);

  const handleChange = (
    field: keyof Omit<UpdateGameDto, 'rules'>,
    value: string | number
  ) => {
    setForm(f => ({ ...f, [field]: value }));
  };

  const handleRuleChange = (
    idx: number,
    field: keyof RuleDto,
    value: string | number
  ) => {
    const updated = [...form.rules];
    updated[idx] = { ...updated[idx], [field]: value };
    setForm(f => ({ ...f, rules: updated }));
  };

  const addRule = () =>
    setForm(f => ({
      ...f,
      rules: [...f.rules, { divisor: 1, word: '' }],
    }));

  const removeRule = (idx: number) =>
    setForm(f => ({
      ...f,
      rules: f.rules.filter((_, i) => i !== idx),
    }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await updateGame(gameId, form);
      navigate('/games');
    } catch (err: any) {
      setError(err.message || 'Update failed');
    } finally {
      setSubmitting(false);
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
          <Button variant="subtle" color="yellow" onClick={() => navigate('/games')}>
            Games
          </Button>
          <Button variant="subtle" color="yellow" onClick={() => navigate('/games/new')}>
            Create
          </Button>
        </Group>
      </Group>

      <Card shadow="lg" p="xl" radius="md" maw={600} mx="auto" mt="xl">
        <Stack gap="md">
          <Title order={3}>Update Game</Title>
          {error && <Text c="red">{error}</Text>}
          <form onSubmit={onSubmit} noValidate>
            <Stack gap="sm">
              <TextInput
                label="Name"
                required
                value={form.name}
                onChange={e => handleChange('name', e.currentTarget.value)}
              />
              <TextInput
                label="Author"
                required
                value={form.author}
                onChange={e => handleChange('author', e.currentTarget.value)}
              />
              <Group grow>
                <NumberInput
                  label="Min Range"
                  min={1}
                  value={form.minRange}
                  onChange={val => handleChange('minRange', val || 1)}
                />
                <NumberInput
                  label="Max Range"
                  min={form.minRange}
                  value={form.maxRange}
                  onChange={val => handleChange('maxRange', val || form.minRange)}
                />
              </Group>

              <Title order={4}>Rules</Title>
              {form.rules.map((r, idx) => (
                <Group key={idx} align="flex-end" gap="sm">
                  <NumberInput
                    label="Divisor"
                    min={1}
                    value={r.divisor}
                    onChange={val => handleRuleChange(idx, 'divisor', val || 1)}
                  />
                  <TextInput
                    label="Word"
                    required
                    value={r.word}
                    onChange={e => handleRuleChange(idx, 'word', e.currentTarget.value)}
                  />
                  <Button
                    type="button"
                    color="red"
                    variant="subtle"
                    onClick={() => removeRule(idx)}
                  >
                    Remove
                  </Button>
                </Group>
              ))}

              <Button type="button" variant="outline" onClick={addRule}>
                Add Rule
              </Button>

              <Group justify="right" mt="md">
                <Button type="submit" loading={submitting}>
                  Update Game
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Card>
    </>
  );
}
