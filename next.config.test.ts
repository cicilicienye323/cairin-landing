import { expect, test } from "vitest";
import config from "./next.config";

// GitHub Pages breaks if any of these change: no server, and the site lives under /cairin-landing/.
test("next config targets a static export under the Pages subpath", () => {
  expect(config.output).toBe("export");
  expect(config.basePath).toBe("/cairin-landing");
  expect(config.images?.unoptimized).toBe(true);
});
