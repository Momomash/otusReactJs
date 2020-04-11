import { parser } from "./parser";

describe("Parser correct cases", () => {
  it("1 + 32", () => {
    expect(parser("1 + 32")).toEqual([1, "+", 32]);
  });
  it("( 1 + 32 )", () => {
    expect(parser("( 1 + 32 )")).toEqual(["(", 1, "+", 32, ")"]);
  });

  it("11 + 3 * 22", () => {
    expect(parser("11 + 3 * 22")).toEqual([11, "+", 3, "*", 22]);
  });

  it("1 + 32 - 2 + 2", () => {
    expect(parser("1 + 32 - 2 + 2")).toEqual([1, "+", 32, "-", 2, "+", 2]);
  });
//new test
  it("3 !", () => {
    expect(parser("3 !")).toEqual([3, "!"]);
  });
  it("3 **", () => {
    expect(parser("3 **")).toEqual([3, "**"]);
  });
  it("3 ^ 5", () => {
    expect(parser("3 ^ 5")).toEqual([3, "^", 5]);
  });
  it("2 + ( 3 + 2 )", () => {
    expect(parser("2 + ( 3 + 2 )")).toEqual([2, "+", "(", 3, "+", 2, ")"]);
  });
//end new test
});

describe("Parser invalid cases", () => {
  it("1 + + 33 - 2", () => {
    expect(() => parser("1 + + 33 - 2")).toThrow(
      TypeError("Unexpected string")
    );
  });

  it("1 ! 33 - 2", () => {
    expect(() => parser("1 ! 33 - 2")).toThrow(TypeError("Unexpected string"));
  });

    it("! 33 - 2", () => {
    expect(() => parser("! 33 - 2")).toThrow(TypeError("Unexpected string"));
  });
//new test
  it("( 2 + 3 ) )", () => {
    expect(() => parser("( 2 + 3 ) )")).toThrow(TypeError("Unexpected string"));
  });
  it("( 2 + 3 + )", () => {
    expect(() => parser("( 2 + 3 + )")).toThrow(TypeError("Unexpected string"));
  });
//end new test
});
