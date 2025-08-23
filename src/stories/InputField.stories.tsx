import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "../components/InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["filled", "outlined", "ghost"],
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "number"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Email Address",
    placeholder: "Enter your email",
    type: "email",
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    value: "invalid-input",
    invalid: true,
    errorMessage: "Username must be at least 3 characters",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Field",
    value: "Cannot edit this",
    disabled: true,
  },
};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    showPasswordToggle: true,
    placeholder: "Enter password",
  },
};

export const Clearable: Story = {
  args: {
    label: "Search",
    value: "Clear me",
    clearable: true,
    placeholder: "Type to search...",
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <InputField variant="outlined" placeholder="Outlined (default)" />
      <InputField variant="filled" placeholder="Filled variant" />
      <InputField variant="ghost" placeholder="Ghost variant" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <InputField size="sm" placeholder="Small size" />
      <InputField size="md" placeholder="Medium size (default)" />
      <InputField size="lg" placeholder="Large size" />
    </div>
  ),
};