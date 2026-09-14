import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import Header from "@/components/Header";
import { LanguageProvider } from "@/components/LanguageProvider";
import SteganographyTool from "@/components/SteganographyTool";

describe("StegaSafe interface", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "en";
  });

  it("uses English by default and can switch to Indonesian", () => {
    render(
      <LanguageProvider>
        <Header />
        <SteganographyTool />
      </LanguageProvider>,
    );

    expect(screen.getByRole("tab", { name: /Hide Message/i })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByRole("tab", { name: /Extract Message/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Drop a PNG image/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Switch to Indonesian/i }));

    expect(screen.getByRole("tab", { name: /Sembunyikan Pesan/i })).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("id");
  });
});
