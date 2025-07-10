import React, { ChangeEvent, FormEvent } from 'react';
import { TextInput, Button, Group } from '@mantine/core';

interface AnswerFormProps {
  answer: string;
  isSubmitting: boolean;
  onAnswerChange: (value: string) => void;
  onSubmit: (value: string) => void;
}

export default function AnswerForm({
  answer,
  isSubmitting,
  onAnswerChange,
  onSubmit,
}: AnswerFormProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    onAnswerChange(e.target.value);
  };

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(answer);
  };

  return (
    <form onSubmit={handleForm}>
      <Group gap="sm" mb="md">
        <TextInput
          placeholder="Your answer"
          value={answer}
          onChange={handleInput}
          disabled={isSubmitting}
        />
        <Button type="submit" loading={isSubmitting}>
          Submit
        </Button>
      </Group>
    </form>
  );
}