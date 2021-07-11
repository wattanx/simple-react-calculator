import { Meta } from "@storybook/react";
import { ReactCalculator } from "../src/components/ReactCalculator";

export default {
  title: "Example/ReactCalculator",
} as Meta;

export const ReactCalculatorExample = () => (
  <div>
    <ReactCalculator />
  </div>
);
