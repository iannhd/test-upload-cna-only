import { render, screen } from "@testing-library/react";
import App from "../../pages/index";
import LandingPageComponent from '../../components/landing-page'

describe("App", () => {
  it("renders without crashing", () => {
    render(<LandingPageComponent />);
    expect(
      screen.getByRole("heading", { title: "Landing Page" })
    ).toBeInTheDocument();
  });
});