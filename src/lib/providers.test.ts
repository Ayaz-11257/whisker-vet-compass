import { describe, expect, it } from "vitest";
import { PROVIDERS, filterProviders } from "./providers";

describe("filterProviders", () => {
  it("returns only providers in the chosen category", () => {
    const result = filterProviders(PROVIDERS, { category: "ambulance" });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.categories.includes("ambulance"))).toBe(true);
  });

  it("matches location against city or area, case-insensitively", () => {
    const result = filterProviders(PROVIDERS, { location: "kolkata" });
    expect(result.map((p) => p.city)).toEqual(expect.arrayContaining(["Kolkata"]));
    expect(result.every((p) => p.city === "Kolkata")).toBe(true);
  });

  it("emergency filter keeps only providers listed as offering emergency care", () => {
    const result = filterProviders(PROVIDERS, { emergency: true });
    expect(result.every((p) => p.emergency)).toBe(true);
  });

  it("every provider uses a placeholder phone number", () => {
    expect(PROVIDERS.every((p) => p.phone.startsWith("+91 00000"))).toBe(true);
  });
});
