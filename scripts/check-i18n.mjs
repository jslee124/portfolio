import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import ts from "typescript";

const dictionary = JSON.parse(readFileSync("data/zh.json", "utf8"));
const unchanged = new Set(["Agent runtime", "LangChain / LangGraph"]);
const source = readFileSync("data/projects.ts", "utf8");
const exports = {};
runInNewContext(
  ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  { exports },
);

function translated(text) {
  assert.ok(
    unchanged.has(text) || dictionary[text],
    `Missing Chinese translation: ${text}`,
  );
  if (!unchanged.has(text))
    assert.match(
      dictionary[text],
      /[\u3400-\u9fff]/,
      `Expected Chinese prose: ${text}`,
    );
}

for (const project of exports.projects) {
  for (const field of [
    "category",
    "tagline",
    "description",
    "overview",
    "motivation",
    "learning",
  ])
    translated(project[field]);
  for (const field of ["entry", "core", "storage", "caption"])
    translated(project.architecture[field]);
  project.architecture.modules.forEach(translated);
  project.sections.forEach(({ title, paragraphs }) => {
    translated(title);
    paragraphs.forEach(translated);
  });
  project.decisions.forEach(({ title, description }) => {
    translated(title);
    translated(description);
  });
  project.sources.forEach(({ label }) => translated(label));
}

const files = [
  "home-page",
  "project-page",
  "site-shell",
  "not-found-page",
  "layout",
  "terminal-hero",
  "terminal-command",
  "system-artwork",
  "project-visuals",
  "project-card",
  "project-scene",
  "architecture",
];
const brands = new Set([
  "mori",
  "MORI",
  "GitHub",
  "LinkedIn",
  "PORTFOLIO OS",
  "help",
  "allow",
  "confirm",
  "deny",
  "PostgreSQL",
  "tool.propose()",
  "tool.execute()",
]);
for (const file of files) {
  const text = readFileSync(`components/${file}.tsx`, "utf8");
  const ast = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      node.expression.getText(ast) === "t" &&
      ts.isStringLiteral(node.arguments[0])
    )
      translated(node.arguments[0].text);
    if (ts.isJsxText(node)) {
      const label = node.text.replace(/\s+/g, " ").trim();
      if (
        /[a-z]{3}/i.test(label) &&
        !label.startsWith("~/projects/") &&
        !label.startsWith("mori:~$")
      ) {
        assert.ok(
          brands.has(label),
          `Unlocalized UI text in ${file}: ${label}`,
        );
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
}
const paths = {};
runInNewContext(
  ts.transpileModule(readFileSync("lib/locale-paths.ts", "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  }).outputText,
  { exports: paths },
);
for (const [locale, pathname, search, hash, expected] of [
  ["en", "/", "", "#projects", "/zh#projects"],
  ["zh", "/zh", "", "#about", "/#about"],
  ["zh", "/zh/", "", "#projects", "/#projects"],
  [
    "en",
    "/projects/forge",
    "?from=home",
    "#architecture",
    "/zh/projects/forge?from=home#architecture",
  ],
  ["zh", "/zh/projects/kestri", "", "#detail-2", "/projects/kestri#detail-2"],
])
  assert.equal(
    paths.switchLanguagePath(locale, pathname, search, hash),
    expected,
  );

console.log(
  `Translation coverage passed: ${Object.keys(dictionary).length} entries, ${exports.projects.length} case studies.`,
);

// Run against a built server to verify route output, metadata, and language links.
if (process.env.I18N_TEST_URL) {
  const base = process.env.I18N_TEST_URL;
  for (const prefix of ["", "/zh"]) {
    for (const suffix of ["", "/projects/forge", "/projects/kestri"]) {
      const path = `${prefix}${suffix}` || "/";
      const response = await fetch(`${base}${path}`);
      assert.equal(response.status, 200, path);
      const html = await response.text();
      assert.ok(
        html.includes(`lang="${prefix ? "zh-CN" : "en"}"`),
        `Document language: ${path}`,
      );
      assert.ok(
        /hrefLang="en"/i.test(html) && /hrefLang="zh-CN"/i.test(html),
        `SEO language alternatives: ${path}`,
      );
      const counterpart = `${prefix ? "" : "/zh"}${suffix}` || "/";
      assert.ok(
        html.includes(`href="${counterpart}"`),
        `Language switch target: ${path}`,
      );
      assert.ok(
        html.includes(prefix ? "我的项目" : "Projects"),
        `Localized navigation: ${path}`,
      );
      assert.ok(
        html.includes(suffix.endsWith("kestri") ? "Python" : "TypeScript"),
        `Technical names preserved: ${path}`,
      );
      if (prefix && suffix)
        assert.ok(
          html.includes(
            `href="/zh/projects/${suffix.endsWith("forge") ? "kestri" : "forge"}"`,
          ),
          `Next project keeps locale: ${path}`,
        );
    }
  }
  const missing = await fetch(`${base}/not-a-page`);
  assert.equal(missing.status, 404);
  console.log(
    "Both homepages, all four case studies, metadata, language links, and global 404 passed.",
  );
}
