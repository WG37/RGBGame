// layout for components on webpage/s
import type { ReactNode } from 'react';
import { Container } from '@mantine/core';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container size="md" px="lg">
      {children}
    </Container>
  );
}