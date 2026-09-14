import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SteganographyTool from "@/components/SteganographyTool";

describe("antarmuka StegaSafe", () => {
  it("menampilkan kedua mode dan area upload yang dapat diakses", () => {
    render(<SteganographyTool />);
    expect(screen.getByRole("tab", { name: /Sembunyikan Pesan/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: /Ekstrak Pesan/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Tarik gambar PNG/i })).toBeInTheDocument();
  });
});
