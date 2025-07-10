import React from 'react';
import { Table } from '@mantine/core';
import { SessionAnswerDto } from '../interfaces/session';

interface SessionTableProps {
  answers: SessionAnswerDto[];
}

export default function SessionTable({ answers }: SessionTableProps) {
  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th>#</th>
          <th>Number</th>
          <th>Your Answer</th>
          <th>Correct?</th>
          <th>Expected</th>
        </tr>
      </thead>
      <tbody>
        {answers.map((ans, idx) => (
          <tr key={ans.id}>
            <td>{idx + 1}</td>
            <td>{ans.number}</td>
            <td>{ans.answerSubmission}</td>
            <td>{ans.isCorrect ? 'Correct' : 'Incorrect'}</td>
            <td>{ans.expectedAnswer ?? '-'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}