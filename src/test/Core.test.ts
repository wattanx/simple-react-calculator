import {
  add,
  subtract,
  multiply,
  divide,
  percentage,
  changeSign,
} from "../logic/Core";

test("Engine Test", () => {
  expect(add("135", "100")).toBe("235");
  expect(subtract("135", "100")).toBe("35");
  expect(multiply("100", "400")).toBe("40000");
  expect(divide("100", "25")).toBe("4");
  expect(divide("0", "0")).toBe("Error");
  expect(divide("30", "0")).toBe("Error");
  expect(percentage("30")).toBe("0.3");
  expect(changeSign("-5")).toBe("5");
  expect(changeSign("5")).toBe("-5");
});
