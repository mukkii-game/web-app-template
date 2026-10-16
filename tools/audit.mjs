// 自動の点検(描画なし・AI を使わない・数秒)。src/game/bots.ts の全ボット × seed で回し、
// tick ごとに src/game/audit.ts の RULES を当てて、規則ごとの件数と例を出す。
// npm run audit            … 既定 20 seed
// npm run audit -- 100     … seed の数を変える
// 回し方: ① 件数の多い規則から直す ② AI の読み手は 1 回 1 人・安いモデルで「笑い・意味・史実」など機械で分からない観点だけ
// ③ 読み手が見つけた機械で分かる矛盾は RULES に足す。作品は logic.ts / bots.ts / audit.ts を書き換えるだけでよい。
import { build } from 'vite';
import fs from 'node:fs';
const seeds = Number(process.argv[2]) || 20;
const SHOW = Number(process.env.SHOW ?? 2);
const entry = 'tools/.audit-entry.ts';
fs.writeFileSync(entry, `
import { init, step } from '../src/game/logic';
import { BOTS } from '../src/game/bots';
import { RULES } from '../src/game/audit';
import { KNOBS } from '../src/tuning';
const v = (k: string) => KNOBS.find((x) => x.key === k)!.value as number;
const cfg = { speed: v('player.speed'), duration: v('game.duration'), scorePer: v('score.per'), width: 480 };
const hits: Record<string, string[]> = {};
let ticks = 0;
for (const [name, make] of Object.entries(BOTS)) {
  for (let seed = 1; seed <= ${seeds}; seed++) {
    const s = init(cfg, seed); const bot = make(seed);
    let guard = 0;
    while (!s.over && guard++ < 60 * 60 * 30) {
      const before = structuredClone({ ...s, rng: undefined }) as any;
      const events = step(s, bot(s, cfg), cfg);
      ticks++;
      for (const [rule, bad] of RULES) if (bad({ before, after: s, events, cfg })) (hits[rule] ??= []).push(name + ' seed ' + seed + ' tick ' + s.tick);
    }
  }
}
(globalThis as any).__audit = { hits, ticks, rules: RULES.map((r) => r[0]) };
`);
try {
  const out = await build({ logLevel: 'silent', configFile: false,
    define: { __BUILD_TIME__: '""', __GIT_SHA__: '""' },
    build: { write: false, lib: { entry, formats: ['es'], fileName: 'a' }, rollupOptions: { output: { inlineDynamicImports: true } } } });
  globalThis.location = { search: '' };
  globalThis.localStorage = { getItem: () => null, setItem: () => {} };
  await import('data:text/javascript,' + encodeURIComponent(out[0].output[0].code));
} finally { fs.rmSync(entry, { force: true }); }

const { hits, ticks, rules } = globalThis.__audit;
const table = rules.map((r) => ({ 規則: r, 件数: hits[r]?.length ?? 0, 例: (hits[r] ?? []).slice(0, SHOW).join(' / ') }));
table.sort((a, b) => b.件数 - a.件数);
console.log(`seed ${seeds} 個ずつ・${ticks} tick を点検`);
console.table(table);
const bad = table.filter((r) => r.件数 > 0);
console.log(bad.length ? `要確認: ${bad.length} 規則で食い違い(件数の多い順に直す)` : '食い違いなし');
fs.mkdirSync('tools/out', { recursive: true });
fs.writeFileSync('tools/out/audit.json', JSON.stringify({ seeds, ticks, table }, null, 2));
process.exitCode = bad.length ? 1 : 0;
