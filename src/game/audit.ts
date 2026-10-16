// 自動の点検の規則(描画なし・AI を使わない)。tools/audit.mjs が bots × seed で回し、tick ごとに全部の規則を当てる。
// 狙い: AI の読み手(ペルソナの通読)に払うトークンを減らす。読み手が見つけた「機械で分かる食い違い・繰り返し」は、
// 直すたびにここへ 1 行足す。回を重ねるほど AI に頼む量が減る(game-creator-life の tools/audit.ts で実測、2026-10-16)。
// 作品は RULES を自分の State / 出来事 / 文に合わせて書き換える。1 規則 = 名前 + 「おかしい時に true」。
import type { State, Config } from './logic';

export interface AuditCtx { before: State; after: State; events: string[]; cfg: Config }
export type Rule = [name: string, bad: (c: AuditCtx) => boolean];

export const RULES: Rule[] = [
  ['画面の外に出た', (c) => c.after.x < 0 || c.after.x > c.cfg.width],
  ['得点が減った', (c) => c.after.score < c.before.score],
  ['押していないのに加点の出来事', (c) => c.events.includes('score') && c.after.score === c.before.score],
  ['終わった後も時間が進んだ', (c) => c.before.over && c.after.tick !== c.before.tick],
  // 文を出す作品の例(状態と本文の食い違い): ['独立中に会社の話', (c) => c.after.status === 'indie' && /出社|送別会/.test(c.text)]
  // 状態が途中で変わる行は誤検知になりやすい。前(before)と後(after)の両方で合わない時だけ数える。
];
