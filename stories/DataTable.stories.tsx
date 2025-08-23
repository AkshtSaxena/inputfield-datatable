import type { Meta, StoryObj } from '@storybook/react';
import { DataTable } from '../components/DataTable';

interface User {
  id: number;
  name: string;
  age: number;
}

const sampleData: User[] = [
  { id: 1, name: 'Akshat', age: 24},
  { id: 2, name: 'Riya', age: 27},
  { id: 3, name: 'Sana', age: 22},
];

const columns = [
  { key: 'id', title: 'ID', dataIndex: 'id' as keyof User, sortable: true },
  { key: 'name', title: 'Name', dataIndex: 'name' as keyof User, sortable: true },
  { key: 'age', title: 'Age', dataIndex: 'age' as keyof User, sortable: true },
];

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const WithSelection: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
    onRowSelect: (rows) => console.log('Selected rows:', rows),
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
    loading: false,
  },
};

export const LargeDataset: Story = {
  args: {
    data: Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      age: 20 + (i % 40),
    })),
    columns,
    selectable: true,
  },
};