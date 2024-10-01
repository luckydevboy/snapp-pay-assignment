import { cleanup } from "@testing-library/react";
import { vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
