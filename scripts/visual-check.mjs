import { chromium } from "playwright-core";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const output = path.join(process.cwd(), "test-results", "visual");
await mkdir(output, { recursive: true });

const browser = await chromium.launch({ executablePath: chrome, headless: true });
const errors = [];

const scenarios = [
  { name: "login-desktop", url: "/login", width: 1440, height: 900 },
  { name: "student-desktop", url: "/aluno", width: 1440, height: 900 },
  { name: "parent-desktop", url: "/responsavel", width: 1440, height: 900 },
  { name: "teacher-desktop", url: "/professor", width: 1440, height: 900 },
  { name: "coordinator-desktop", url: "/coordenacao", width: 1440, height: 900 },
  { name: "director-desktop", url: "/direcao", width: 1440, height: 900 },
  { name: "student-mobile", url: "/aluno", width: 390, height: 844 },
  { name: "grades-mobile", url: "/aluno/notas", width: 390, height: 844 },
  { name: "roll-call-mobile", url: "/professor/chamada", width: 390, height: 844 },
];

for (const scenario of scenarios) {
  const context = await browser.newContext({ viewport: { width: scenario.width, height: scenario.height }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`${scenario.name}: console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`${scenario.name}: pageerror: ${error.message}`));
  const response = await page.goto(`http://127.0.0.1:3000${scenario.url}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  if (!response?.ok()) errors.push(`${scenario.name}: HTTP ${response?.status() ?? "no response"}`);
  const overflow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  if (overflow.scrollWidth > overflow.clientWidth + 2) errors.push(`${scenario.name}: horizontal overflow ${overflow.scrollWidth}px > ${overflow.clientWidth}px`);
  await page.screenshot({ path: path.join(output, `${scenario.name}.png`), fullPage: true });
  await context.close();
}

const interactionContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const interactionPage = await interactionContext.newPage();
interactionPage.on("pageerror", (error) => errors.push(`interaction: ${error.message}`));
await interactionPage.goto("http://127.0.0.1:3000/login", { waitUntil: "networkidle" });
await interactionPage.getByRole("button", { name: /Aluno/ }).click();
await interactionPage.waitForURL("**/aluno");
await interactionPage.getByRole("link", { name: /Minhas notas/ }).click();
await interactionPage.waitForURL("**/aluno/notas");
await interactionPage.getByRole("button", { name: /notificações/i }).click();
if (!(await interactionPage.getByText("Marcar como lidas").isVisible())) errors.push("interaction: notification center did not open");
await interactionContext.close();

await browser.close();
await writeFile(path.join(output, "report.json"), JSON.stringify({ scenarios: scenarios.length, errors }, null, 2));
console.log(JSON.stringify({ scenarios: scenarios.length, errors }, null, 2));
process.exitCode = errors.length ? 1 : 0;
