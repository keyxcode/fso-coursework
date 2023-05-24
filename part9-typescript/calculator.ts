// TS has 3 default simple types: string, number, boolean
// For arrays, we can use the syntax number[] or Array<number>

// interface keyword defines the "shape" an object should have.
interface CalculationValues {
  value1: number;
  value2: number;
}

const parseArguments = (args: string[]): CalculationValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error("Provided values were not numbers!");
  }

  return {
    value1: Number(args[2]),
    value2: Number(args[3]),
  };
};

// type keyword creates custom type/ a type alias
// In this case, the custom type accepts only these 3 kinds of values
// the following is called a union type
type Operation = "multiply" | "add" | "divide";

const calculator = (a: number, b: number, op: Operation): number => {
  switch (op) {
    case "multiply":
      return a * b;
    case "divide":
      if (b === 0) throw new Error("Can't divide by 0!");
      return a / b;
    case "add":
      return a + b;
    default:
      throw new Error("Operation is not multiply, add or divide!");
  }
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(
    `Calculated ${value1} and ${value2}, the result is: ${calculator(
      value1,
      value2,
      "add"
    )}`
  );
} catch (error: unknown) {
  // unknown is a type that was introduced in TypeScript version 3 to be the type-safe counterpart of any.
  let errorMessage = "Something bad happened.";
  // no operations are permitted on an unknown without first asserting or narrowing it to a more specific type.
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

export { calculator, Operation };
