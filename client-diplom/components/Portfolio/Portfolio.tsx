"use client";

import { Button, Flex, Heading, IconButton, Link, Table, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { usePortfolioStore } from "@/store/portfolioStore";
import { Achievement } from "@/interface";

interface Props {
  userId: number;
}

export const Portfolio = ({ userId }: Props) => {
  const { portfolio, fetchPortfolio } =
    usePortfolioStore();

  useEffect(() => {
    fetchPortfolio(userId);
  }, [userId]);

  const isPassed = (achievement: Achievement) => {
    if (achievement.passed) {
      return "Зачтено";
    } else {
      return "Не зачтено"
    }
  };

  return (
    <Flex direction='column' gap='4' p='4'>
      <Heading as="h2" size='5'>Моё портфолио</Heading>

      {portfolio?.achievements?.length === 0 ? (
        <Text>В портфолио студента пока не добавлено ни одного достижения</Text>
      ) : (
        <Table.Root size="3" variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Название</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Описание</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Статус</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Ссылка</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {portfolio?.achievements?.map((a) => (
              <Table.Row key={a.id}>
                <Table.RowHeaderCell>{a.title}</Table.RowHeaderCell>
                <Table.Cell>{a.description}</Table.Cell>
                <Table.Cell>{isPassed(a)}</Table.Cell>
                <Table.Cell>
                  <Link
                    href={`http://localhost:8000${a.fileUrl}`}
                    target="_blank"
                  >
                    Открыть
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Flex>
  );
};
