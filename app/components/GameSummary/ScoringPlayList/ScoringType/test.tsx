import { render, screen } from "@testing-library/react";
import { ScoringType } from ".";

describe("ScoringType", () => {
  describe("when rendered with an even strength goal", () => {
    let container: HTMLElement;

    beforeEach(() => {
      container = render(<ScoringType goalType="ev" />).container;
    });

    it("should render empty", () => {
      expect(container).toBeEmptyDOMElement();
    });
  });

  describe("when rendered with a short handed goal", () => {
    beforeEach(() => {
      render(<ScoringType goalType="sh" />);
    });

    it("should render `SHG`", () => {
      expect(screen.getByText("SHG")).toBeInTheDocument();
    });
  });

  describe("when rendered with a power play goal", () => {
    beforeEach(() => {
      render(<ScoringType goalType="pp" />);
    });

    it("should render `PP`", () => {
      expect(screen.getByText("PP")).toBeInTheDocument();
    });
  });

  describe("when rendered with a empty net goal", () => {
    beforeEach(() => {
      render(<ScoringType goalType="en" />);
    });

    it("should render `EN`", () => {
      expect(screen.getByText("EN")).toBeInTheDocument();
    });
  });
});
