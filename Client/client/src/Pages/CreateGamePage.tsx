import React, {JSX, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { createGame } from '../Services/api-handler';
import { CreateGameDto, RuleDto } from '../Interfaces/api';
import { Box, Title, TextInput, NumberInput, Button, Group, Text, Card, Stack,} from '@mantine/core';

export default function CreateGamePage(): JSX.Element {
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateGameDto>({
    name: '',
    author: '',
    minRange: 1,
    maxRange: 100,
    rules: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    field: keyof Omit<CreateGameDto, 'rules'>,
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

  const addRule = () => {
    setForm(f => ({
      ...f,
      rules: [...f.rules, { divisor: 1, word: '' }],
    }));
  };

  const removeRule = (idx: number) => {
    setForm(f => ({
      ...f,
      rules: f.rules.filter((_, i) => i !== idx),
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createGame(form);
      navigate('/games');
    } catch (err: any) {
      setError(err.message || 'Game creation failed');
    } finally {
      setLoading(false);
    }
  };

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

      <Card shadow="lg" p="xl" radius="md" maw={600} mx="auto" mt="xl">
        <Stack gap="md">
          <Title order={3}>Create Game</Title>
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
                  onChange={val =>
                    handleChange('maxRange', val || form.minRange)
                  }
                />
              </Group>

              <Title order={4}>Rules</Title>
              {form.rules.map((r, idx) => (
                <Group key={idx} align="flex-end" gap="sm">
                  <NumberInput
                    label="Divisor"
                    min={1}
                    value={r.divisor}
                    onChange={val =>
                      handleRuleChange(idx, 'divisor', val || 1)
                    }
                  />
                  <TextInput
                    label="Word"
                    required
                    value={r.word}
                    onChange={e =>
                      handleRuleChange(idx, 'word', e.currentTarget.value)
                    }
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
                <Button type="submit" loading={loading}>
                  Create Game
                </Button>
              </Group>
            </Stack>
          </form>
        </Stack>
      </Card>
    </>
  );
}