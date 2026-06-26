# Personal AGI Membrane MVP要件定義

## 目的

Series T - Post AGI from Kyoto のピッチで、Personal AGI Membrane の価値を3-5分で伝えられるデモを作る。

このMVPは「本物のAGI」や「本物のスマートグラス」ではない。現在のOpenAI APIで実装できる範囲に絞り、以下を見せる。

1. 同じ依頼を Private / Public / Business の3つの役割AIが別々に判断する
2. それぞれのAIが「渡してよい情報」「渡してはいけない情報」「人間承認が必要な理由」を返す
3. 人間には長い会話ログではなく、Swipe Reality Gate として最後の判断だけが出る
4. ユーザーは右スワイプでYes、左スワイプでNo、下スワイプで音声の追加指示を行う
5. 不安な時だけ長押しで Agent Trace の要約を同じ画面上に開き、AIが何を参照し、何を渡し、何を止めたか確認できる
6. 将来像として、スマートグラス上ではこの判断が現実に薄く重なることを示す

---

## デモの結論

デモで伝えるべき一文:

> AIエージェントが人間の代わりに社会へ接触する時代には、返答を自動生成するだけでは足りない。必要なのは、Private / Public / Business の境界を守りながら、現実を変える直前だけ人間に承認を求めるインターフェースである。

最終的なUIコンセプト名:

```text
Swipe Reality Gate
```

サブコピー:

```text
AIが整理し、人間が最後にスワイプで同意する。
```

---

## 今のAIでできること / できないこと

### 今のAPIで十分できること

* 依頼文やイベント情報を読み、Private / Public / Business のどの領域に関係するか分類する
* 役割ごとに異なる観点でリスクと推奨アクションを出す
* 「共有してよい情報」「共有してはいけない情報」を列挙する
* Reality Gate に出す短い承認文を作る
* Agent Trace 用の説明を構造化JSONで返す
* デモ用に、複数エージェントが裏で判断しているように見せる
* ユーザーの追加指示をもとに、Reality Gateだけを再生成する

### MVPではやらないこと

* 本当に外部企業のAIと交渉する
* 実カレンダーへ予定登録する
* 実SNSへ投稿する
* 実メールを送信する
* スマートグラスと連携する
* 常時バックグラウンドで現実を監視する
* 完全自律エージェントとして本番運用する

### デモ上の正直な言い方

「現時点のMVPでは、複数の役割プロンプトと構造化出力で、AGI同士の接触をシミュレートしています。プロダクト価値は、モデルそのものではなく、AIが社会へ接触する時の境界、同意、監査、Human Review のUIにあります。」

---

## MVPスコープ

### Must

* スマホ幅で綺麗に見えるWebアプリ
* 1画面内で1つのメインシナリオを最後までデモできる
* 4つのサブシナリオを切り替えられる
* Private / Public / Business の3つの膜が同じ画面内に見える
* Reality Gate が1つの中央判断表示として生成される
* 長押しで Agent Trace の要約が同じ画面上に見える
* 右スワイプでYes、左スワイプでNo、下スワイプで音声の追加指示ができる
* 承認後に「現実に反映される内容」のプレビューが出る
* スマートグラス完成形のモック画面が1枚ある

### Should

* OpenAI APIを使って判断結果を生成する
* APIが落ちてもデモできるように、固定のフォールバック結果を持つ
* AI処理中に「Business AGI確認中」「Private AGIへhandoff」などの演出を出す
* Agent Trace に「渡した情報 / 渡さなかった情報」を明示する
* ピッチ用に3分デモモードを用意する
* 下スワイプ後の音声またはテキスト指示で Reality Gate を再生成できる

### Could

* デモシナリオをユーザーが編集できる
* 音声読み上げ風の Whisper 表示を出す
* 眼鏡モックで視界上のオーバーレイ風UIを見せる

### Won't

* ログイン
* DB永続化
* 本番OAuth連携
* 複数ユーザー管理
* 決済
* 契約締結
* メール/SNS/カレンダーへの実送信

---

## 最小デモシナリオ

最初に作るべきメインシナリオは「登壇依頼」だけでよい。これが最もコンセプトを伝えやすい。

### シナリオ: 登壇依頼

外部から以下の依頼が届く。

```text
B社のイベント担当者から、Aさんに登壇依頼が届いた。

日時: 2026年7月1日 15:00-16:00
場所: 京都市内
テーマ: AIエージェントと個人の働き方
謝礼: 30万円
依頼内容: 40分登壇、20分Q&A
公開範囲: イベントページに氏名、会社名、登壇タイトルを掲載したい
SNS: 登壇後に写真付きで投稿したい
確認したいこと: 登壇可能か、公開可能な肩書き、SNS投稿可否
```

### デモの流れ

1. ユーザーが Swipe Reality Gate 画面を見る
2. 中央に「登壇依頼」の判断表示が出る
3. 判断生成時に3つのAGIが順番に動く短い演出が出る
   * Business AGI: 条件、謝礼、公開範囲を確認
   * Private AGI: 空き時間だけ確認。予定名は渡さない
   * Public AGI: SNS公開可否と発信リスクを確認
4. Private / Public / Business の膜が光り、短い判断文が出る
5. AI判断が1つの Reality Gate 判断表示に集約される
6. ユーザーが右スワイプでYes、左スワイプでNo、下スワイプで条件を音声追加する
7. 下スワイプした場合は「写真投稿は事前確認にして」などを音声で伝え、Reality Gate が再生成される
8. 長押しすると、Agent Trace 要約が判断表示の上にオーバーレイ表示される
9. 「外部へ返す内容」の短いプレビューが1秒だけ出る
10. 最後に Glass Preview で、現実世界に薄く重なる将来像を見せる

---

## A/B並列デモ要件

登壇用デモでは、AさんとBさんの画面を並列に表示する。

### Aさん画面

* Personal AGI Membrane として表示する
* Bさん側から届いた登壇依頼を Reality Gate として表示する
* 左スワイプで No
* 右スワイプで Yes
* 下スワイプで音声の追加指示
* 長押しで Agent Trace

### Bさん画面

* Business AGI Membrane として表示する
* Aさんへ登壇依頼を送信済みの状態から始める
* Aさん側の判断結果を受信表示する
* AさんがYesにした場合は、条件付き承認として表示する
* AさんがNoにした場合は、停止として表示する
* Aさんが音声で条件を追加した場合は、その追加条件をBさん側に表示する

### 目的

この並列表示は、AIチャットの片側体験ではなく、AI同士が社会的接触を始めた時に、個人の膜がどこで判断し、どこで人間に同意を求め、どの内容だけが相手側へ戻るかを見せるためのものである。

---

## 画面要件

## 1. Swipe Reality Gate

### 目的

複数画面を遷移して確認するアプリではなく、1画面内で Reality Gate の承認判断を完結させる。

ユーザーは複数画面を移動しない。1つの画面内に Private / Public / Business の3つの膜と、中央の Reality Gate 判断表示を出す。AIエージェント同士の判断結果は、一覧やチャットではなく、現実に介入する直前の1つの判断として集約される。

### 基本操作

Reality Gate 判断表示に対して、以下のジェスチャーで判断する。

* 右スワイプ: Yes / 通す
* 左スワイプ: No / 止める
* 下スワイプ: 音声で指示を追加する
* 長押し: 詳細確認 / Agent Trace の簡易表示

画面遷移は原則発生させない。判断表示が画面内で動き、状態が変化し、次の判断がある場合だけ中央へ静かに出る。

### サブコピー

```text
AIが整理し、人間が最後にスワイプで同意する。
```

---

## Visual Design Principles

Swipe Reality Gate は、Reactで作ったSaaS風ダッシュボードや業務ツールに見せない。ユーザーが見るのは、一覧、ボタン、チャットログではなく、現実に介入する直前の判断だけである。

全体の見た目は、貼付画像の方向性を基準にする。黒に近い深い背景、広い余白、薄い光、最小限の文字で構成する。サイバーパンクに寄せすぎず、白背景の業務アプリにも寄せすぎない。「Apple的な静けさ」「近未来的な膜」「AGIが裏で判断している気配」が同居するUIにする。

### 見た目の原則

* 背景は黒に近い深色を基調にする
* 文字量は最小限にし、長文説明を画面上に出さない
* 余白を広く取り、判断文と膜の存在感を優先する
* 光は薄く、静かに使う
* 過剰なネオン、強い警告色、サイバーパンク風の装飾は避ける
* 四角い枠線、管理画面風カード、ツールバー、装飾アイコンを主役にしない
* UIの主役は、操作ボタンではなく Reality Gate の判断である

### 禁止事項

以下は避ける。

* SaaSダッシュボード風
* 管理画面風
* チャットUI
* 明確な承認ボタン
* 左右下の大きな矢印
* カードを何枚も並べる一覧UI
* 過剰なネオン
* サイバーパンク感の強すぎる配色
* 白背景の業務アプリ風
* 情報量の多い表形式
* 角丸カードとアイコンを多用したReactデモ風UI

---

## 2. 画面構成

### 表示

* 背景: 黒に近い深い背景。必要に応じてごく薄いグラデーションと光のにじみを使う
* 上部: `Personal AGI Membrane` と承認待ち件数だけを置く
* 上部から中央の1/3: Private / Public / Business の3つの膜を AGI Membrane Indicator として表示する
* 中央: 現在判断すべき Reality Gate の判断文を空間に浮かべる
* 中央背面: 判断文の背後に、ごく薄いガラス層または淡い光の面を敷く
* 下部: ごく薄い操作補助テキストのみを置く

上部には装飾的なメニュー、アイコン、矢印、ボタンを置かない。下部にも左右矢印や大きな操作ボタンは置かない。

判断表示は常に1つだけを主役にする。複数の承認待ちがある場合も、次の判断は背後に薄く存在を感じさせる程度に留め、一覧UIにはしない。

下部補助テキスト例:

```text
スワイプで判断
長押しで詳細
```

または:

```text
Swipe to decide
Long press to inspect
```

---

## AGI Membrane Indicator

### 目的

Private / Public / Business の3つの円は装飾ではなく、「この依頼がどの領域に触れているか」を示すインジケーターである。画面上部から中央にかけて、3つの円を薄く浮遊する3Dオブジェクトのように表示する。

### 登壇依頼での表示

登壇依頼の場合は、以下の強弱で表示する。

* Business: 最も明るい。条件、謝礼、登壇可否を確認する主領域
* Public: 中程度に明るい。肩書き公開、SNS投稿、写真利用を確認する領域
* Private: 控えめに明るい。空き時間だけを参照し、予定名は渡さない領域

各円には長文説明ではなく、短い状態ラベルだけを添える。

* Private: 空き時間のみ参照
* Public: 公開確認
* Business: 条件確認

### 表現

* 円は半透明で、膜のように薄く重なる
* 内部に細い光の線がゆっくり流れる
* 常時は呼吸するようにわずかに膨張収縮する
* 依頼解析中は Business -> Private -> Public の順に、該当する円が少し前に出て発光する
* 判断がまとまったら、3つの円が中央へわずかに引き寄せられて共鳴する
* 通す場合は関係する円が白寄りに発光する
* 止める場合は赤く警告するのではなく、彩度を落として静かに沈む

---

## 3. Reality Gate カード

### 目的

外部から来た依頼、3つのAGI膜の判断、最終承認を1枚に集約する。

### 表示

実装上は `RealityGateCard` と呼んでもよいが、見た目としては強いカード型UIにしない。四角い枠線やSaaS的なカードを避け、「空間に浮かぶ判断文」に近づける。ただし完全なテキストだけでは読みづらいため、テキスト背後にごく薄いガラス層、または淡い光の面を敷く。

中央には以下だけを表示する。

* 依頼種別
* 依頼元
* 推奨判断
* 日時
* 場所
* 謝礼
* 共有OK
* 共有NG

影響するAGI膜、AIの理由、関連AGI数などは、中央の主表示ではなく AGI Membrane Indicator や長押し時の Trace Overlay に逃がす。長文説明は出さない。詳細は長押し時だけ同じ画面上にオーバーレイ表示する。

### 登壇依頼表示の例

```text
登壇依頼

From: B社

推奨: 条件付きで通す

日時: 2026/07/01 15:00-16:00

場所: 京都市内

謝礼: 30万円

共有OK: 空き時間 / 公開可能肩書き / 登壇可否

共有NG: 予定名 / 前後の私的予定 / 同行者情報
```

---

## 4. スワイプ後の状態変化

### 右スワイプ: 通す

* 判断表示が右へ静かに流れる
* Business / Public / Private のうち該当する膜が発光する
* 「承認済み」と表示する
* 外部へ返す内容の短いプレビューを1秒だけ出す
* 次の判断があれば中央へ来る

### 左スワイプ: 止める

* 判断表示が左へ静かに流れる
* 該当する膜は赤く警告せず、彩度を落として静かに沈む
* 「停止しました」と表示する
* 外部へは送信されない
* 次の判断があれば中央へ来る

### 下スワイプ: 音声で指示を追加する

* 判断表示が下へ少し沈む
* 判断表示の下部に短い音声入力UIを表示する
* 対応ブラウザでは、下スワイプ後に音声認識を開始する
* ユーザーが音声で条件や指示を伝える
* 音声認識が使えない環境では、同じ位置に短いテキスト入力をフォールバックとして出す
* 送信後、AIが Reality Gate を再生成する
* 再生成中は、膜の間に光のラインを出す

入力例:

* 「謝礼は30万円以上で確認して」
* 「写真投稿は事前確認にして」
* 「会社名は出さないで」
* 「18時以降に変更できるか聞いて」
* 「この条件なら前向きと返して」

### 長押し: 詳細確認

* 画面遷移せず、現在の判断文の上に半透明オーバーレイで詳細を表示する
* 表示内容は Agent Trace の要約に限定する
* 「何を参照したか」
* 「何を渡したか」
* 「何を渡さなかったか」
* 「なぜ Human Review になったか」

---

## Motion Design

### 目的

動きは派手な演出ではなく、「AGIが裏で判断している気配」を伝えるために使う。画面遷移、ローディングスピナー、説明的なステップ表示を主役にしない。

### 常時状態

* 3つの膜はゆっくり呼吸するように膨張収縮する
* 膜の内部では細い光の線が低速で流れる
* Reality Gate の判断文は、空間にわずかに浮いているように見せる
* 文字や光は過度に点滅させない

### 解析中

* Business -> Private -> Public の順で、該当する膜が少し前に出る
* 発光は短く、薄く、静かに行う
* 解析中でも画面が業務アプリの処理待ちに見えないようにする

### 判断確定時

* 3つの膜が中央へわずかに引き寄せられる
* 膜同士が短く共鳴し、中央の判断文に収束する
* 「AIが判断した」ではなく「境界を通す準備が整った」印象にする

### 操作後

* 通す場合は、関係する膜が白寄りに明るくなる
* 止める場合は、赤い警告ではなく、彩度が落ちて静かに沈む
* 指示追加時は、判断表示が下へ沈み、音声入力だけが控えめに出る

---

## 5. 統合される旧画面要素

以下の画面は、独立画面として分けすぎない。

* Incoming Request Card
* Membrane Processing
* Role Lens Preview
* Reality Gate
* Agent Trace

統合後の扱い:

* Incoming Request Card: Reality Gate カードの表面として扱う
* Membrane Processing: カード生成時の短い演出として扱う
* Role Lens Preview: 3つの膜の発光、ラベル、短い判断文として扱う
* Reality Gate: 中央カードそのものとして扱う
* Agent Trace: 長押し時のオーバーレイとして扱う

Membrane Processing の演出例:

1. Business AGI確認中
2. Private AGIへ空き時間のみ確認
3. Public AGIが公開範囲を確認
4. Reality Gate生成

---

## 6. Demo Launcher

### 目的

デモシナリオを選ぶ入口。

### 表示

* プロダクト名: Personal AGI Membrane
* タグライン: Reality changes only when you allow it.
* シナリオカード
  * 登壇依頼
  * イベント参加とSNS投稿
  * 名刺交換
  * 紹介依頼
* 「3分デモを開始」ボタン

### 操作

* シナリオ選択
* デモ開始

---

## 7. 外部返信プレビュー

### 目的

スワイプ承認後、現実に反映される内容を短く見せる。

### 条件付きで通す場合のプレビュー例

```text
登壇候補として前向きに検討可能です。
ただし、以下の条件を確認させてください。

1. イベントページに掲載する肩書き・会社名の事前確認
2. 写真付きSNS投稿の事前確認
3. 資料の二次利用範囲
4. 会場までの移動条件

なお、現時点では当日の空き時間のみ確認済みです。
詳細な個人予定は共有しません。
```

---

## 8. Trace Overlay

### 目的

AIの判断を後から確認できるようにする。独立画面ではなく、長押し時の同画面オーバーレイとして表示する。

通常時は Agent Trace を表示しない。長押し時のみ、現在の判断文の上に半透明で重ねる。別画面へ遷移せず、Reality Gate の文脈を保ったまま確認できるようにする。

Trace Overlay では、以下だけを短く表示する。

* 何を参照したか
* 何を渡したか
* 何を渡さなかったか
* なぜ Human Review になったか

表形式は内部整理には使ってよいが、本番UIでは情報量の多い表をそのまま見せない。短い行、薄い区切り、半透明の重なりで表示する。

### Trace要約例

| Step | Actor | Action | Result |
| --- | --- | --- | --- |
| 1 | Business AGI | 登壇依頼を分類 | Business主、Public/Privateにも影響 |
| 2 | Business AGI | Private AGIへ空き確認 | 予定名を要求せず、空き時間だけ要求 |
| 3 | Private AGI | 予定情報をフィルタ | 空き時間のみ返却。予定名は非共有 |
| 4 | Public AGI | SNS公開範囲を確認 | 写真投稿は事前確認が必要 |
| 5 | Membrane | Reality Gate生成 | 条件付き承認を推奨 |

---

## 9. Glass Preview

### 目的

「スマホで作る。眼鏡で完成する。」を視覚で理解させる。

### 表示

スマートグラス視界風の横長モック。

* 目の前のイベントポスター
* 小さなOverlay
  * Business: 条件確認済み
  * Public: SNS投稿は要確認
  * Private: 予定名は非共有
* Whisper
  * 「条件付きで通せます。公開範囲だけ確認してください。」
* Reality Gate Pulse
  * 通す / 止める / 保留

### 注意

本物のARではなく、未来像のモックとして明示する。

---

## データモデル

## Scenario

```ts
type Scenario = {
  id: "speaking_request" | "event_post" | "business_card" | "introduction";
  title: string;
  source: string;
  requestType: string;
  rawRequest: string;
  context: {
    userProfile: string;
    privateContext: string;
    publicContext: string;
    businessContext: string;
  };
};
```

## AgentDecision

```ts
type AgentDecision = {
  agent: "private" | "public" | "business";
  status: "allow" | "deny" | "hold" | "conditional" | "human_review";
  summary: string;
  shareableInfo: string[];
  withheldInfo: string[];
  risks: string[];
  requiredChecks: string[];
  handoffRequests: {
    to: "private" | "public" | "business" | "human";
    reason: string;
    allowedScope: string;
  }[];
};
```

## RealityGate

```ts
type SwipeAction = "pass" | "stop" | "instruct" | "inspect";

type RealityGate = {
  recommendation: "pass" | "stop" | "conditional";
  title: string;
  shortReason: string;
  allowedToSend: string[];
  mustNotSend: string[];
  conditions: string[];
  externalReplyDraft: string;
  humanReviewReason: string;
  swipeActions: {
    right: {
      action: "pass";
      label: string;
      resultMessage: string;
    };
    left: {
      action: "stop";
      label: string;
      resultMessage: string;
    };
    down: {
      action: "instruct";
      label: string;
      placeholder: string;
      examples: string[];
    };
    longPress: {
      action: "inspect";
      label: string;
      traceSummary: string[];
    };
  };
};
```

## AgentTrace

```ts
type AgentTrace = {
  steps: {
    order: number;
    actor: string;
    action: string;
    inputScope: string;
    output: string;
    guardrail?: string;
  }[];
};
```

## MembraneAnalysis

```ts
type MembraneAnalysis = {
  scenarioId: string;
  touchpoints: ("private" | "public" | "business")[];
  decisions: AgentDecision[];
  realityGate: RealityGate;
  trace: AgentTrace;
  whisper: string;
  activeCard: {
    id: string;
    sourceAgent: string;
    targetAgent: string;
    touchedMembranes: ("private" | "public" | "business")[];
    status: "waiting" | "approved" | "stopped" | "instruction_required" | "regenerating";
  };
};
```

---

## AI実装要件

## 推奨方針

デモ最短では、OpenAI API呼び出しは1回でよい。1回のプロンプト内で Private / Public / Business の3役を明示し、構造化JSONで `MembraneAnalysis` を返す。

理由:

* デモ中の失敗点を減らせる
* レイテンシが短い
* Agent Trace をアプリ側で安定表示できる
* 「複数AGI風」の体験はUIと構造化出力で十分伝わる

将来は、各AGIを別エージェントとして実行し、handoffやguardrailsを実装する。

## API呼び出し

### Endpoint

```http
POST /api/analyze
```

### Request

```json
{
  "scenarioId": "speaking_request",
  "rawRequest": "...",
  "context": {
    "userProfile": "...",
    "privateContext": "...",
    "publicContext": "...",
    "businessContext": "..."
  }
}
```

### Response

`MembraneAnalysis` 型のJSON。

### フォールバック

APIエラー時は `fixtures/analysis/speaking_request.json` を返す。

ピッチ本番では、必ずフォールバックON/OFFを切り替えられるようにする。APIが動かなくてもデモが止まらないことを優先する。

## Reality Gate 再生成

下スワイプで音声またはテキスト指示が追加された場合、既存の分析結果と追加指示をもとに、Reality Gate だけを再生成できるようにする。

### Endpoint

```http
POST /api/revise-gate
```

### Request

```json
{
  "scenarioId": "speaking_request",
  "currentAnalysis": "...",
  "userInstruction": "写真投稿は事前確認にして",
  "currentRealityGate": "..."
}
```

### Response

```ts
RealityGate
```

### フォールバック

APIが失敗した場合は、固定のフォールバック結果を返す。デモでは再生成失敗を見せず、追加指示が反映された判断表示に必ず戻す。

---

## プロンプト要件

## System Prompt

```text
You are the reasoning engine for Personal AGI Membrane.

This product is not a chat assistant. It evaluates whether an incoming real-world request should pass through a user's Private, Public, and Business boundaries.

You must simulate three role-specific agents:

1. Private AGI protects personal life, calendar details, family, friends, private preferences, and sensitive context.
2. Public AGI handles public identity, events, community, introductions, and social posting.
3. Business AGI handles work, speaking requests, sales, estimates, contracts, and professional commitments.

Rules:
- Do not maximize automation.
- Always preserve human approval before any real-world action.
- Separate shareable information from withheld information.
- If a decision affects relationships, money, contract, public posting, or private information, mark it as requiring human review or conditional approval.
- Output must be concise and suitable for a mobile UI.
- Reality Gate must support swipe actions: right for Yes/pass, left for No/stop, down to add a voice instruction, long press to inspect trace.
- Return only valid JSON matching the provided schema.
```

## User Prompt

```text
Analyze the following incoming request for Personal AGI Membrane.

Incoming request:
{{rawRequest}}

User profile:
{{userProfile}}

Private context:
{{privateContext}}

Public context:
{{publicContext}}

Business context:
{{businessContext}}

Return a MembraneAnalysis JSON object.
```

---

## 固定デモデータ

## User A

```text
ユーザーAは、AI活用支援を行う個人事業主/スタートアップ創業者。
イベント登壇、SNS発信、事業会社との商談、コミュニティ参加が多い。
個人予定や家族予定は外部に出したくない。
登壇は条件が合えば前向きだが、肩書き、社名、写真利用、資料二次利用は事前確認したい。
```

## Private Context

```text
2026年7月1日 15:00-16:00は空いている。
ただし、前後に私的予定があるため、移動時間の確認が必要。
予定名、相手、場所、家族に関する情報は共有不可。
```

## Public Context

```text
AIエージェント、個人の働き方、スタートアップに関する発信は公開可能。
ただし、未公開プロジェクト名、同行者の顔写真、相手企業の未公開情報は投稿不可。
写真付きSNS投稿は事前確認が必要。
```

## Business Context

```text
登壇謝礼の目安は30万円以上。
公開肩書きは「AIプロダクト開発者 / 個人事業主」まで可。
会社名やクライアント名の掲載は個別確認が必要。
資料の二次利用、録画公開、交通費、拘束時間は確認が必要。
```

---

## サブシナリオ要件

## イベント参加とSNS投稿

### 入力

イベントに参加後、SNSに写真付き投稿をしたい。

### 見せる価値

Public AGI が投稿候補を作るが、Business AGI が仕事情報の公開範囲を確認し、Private AGI が同行者や顔写真を守る。

### Reality Gate

「投稿する / 下書き保存 / 止める」

## 名刺交換

### 入力

イベントで受け取った名刺と会話メモ。

### 見せる価値

Business AGI がフォロー文を作り、Public AGI がSNS接続可否を判断し、Private AGI は関与しない。

### Reality Gate

「お礼メッセージを送る / 保留 / 止める」

## 紹介依頼

### 入力

知人Aから、知人Bを紹介してほしいという依頼。

### 見せる価値

Public AGI は紹介可能性を見るが、相手がPrivate領域に近い場合は Human Review へ上げる。

### Reality Gate

「紹介する / 保留 / 断る」

---

## UI設計方針

## 見た目

* SaaSダッシュボードにしない
* 管理画面風にしない
* チャットUIを主画面にしない
* カードを何枚も並べる一覧UIにしない
* 中央の短い判断文と、3つの膜のインジケーターを中心にする
* スマホ画面を第一にする
* 画面遷移を極力なくす
* ユーザーに一覧を読ませない
* 承認判断は常に1つの Reality Gate 判断表示に集約する
* 非現実的な膜のビジュアルと、日常的なスワイプ操作を組み合わせる
* UIの目的は、情報管理ではなく、現実変更前の同意である
* 余白は広め、情報は短く
* 色は3領域の光量と彩度で分ける
  * Private: 深い青または紫。控えめに明るい
  * Public: 紫またはシアン。中程度に明るい
  * Business: 白寄りのシアンまたは薄いミント。最も明るい
* Reality Gate は画面中央に静かに強く出す
* Agent Trace は控えめな同画面オーバーレイ
* 貼付画像のように、黒に近い背景、薄い光の膜、最小限の文字を基準にする
* サイバーパンクに寄せすぎず、Apple的な静けさを保つ

## 操作

* 基本はスワイプ
* 右で通す
* 左で止める
* 下で音声指示を追加
* 長押しで詳細
* タップは補助操作に留める
* 人間が行う操作は、通す / 止める / 指示する の3系統に限定する
* スワイプ操作によって、AIが社会へ接触する前の最終同意を表現する
* API待機中でも画面が止まって見えないよう、ステップ演出を出す
* 承認ボタンは置かない
* 左右下の大きな矢印は置かない
* 操作ヒントは下部に薄い補助テキストとしてだけ置く

---

## 実装推奨

新規で作るなら、最短は以下。

* Next.js
* TypeScript
* Tailwind CSS
* OpenAI APIはサーバー側Route Handlerで呼ぶ
* デモデータは `src/data/scenarios.ts`
* フォールバック分析結果は `src/data/fixtures.ts`
* UI状態はクライアントコンポーネントのローカルstateで十分
* DBなし
* 認証なし

### 推奨ディレクトリ

```text
app/
  page.tsx
  api/
    analyze/
      route.ts
    revise-gate/
      route.ts
components/
  SwipeRealityGate.tsx
  MembraneOrbs.tsx
  RealityGateCard.tsx
  SwipeInstructionInput.tsx
  TraceOverlay.tsx
  GlassPreview.tsx
data/
  scenarios.ts
  fixtures.ts
lib/
  openai.ts
  membrane-schema.ts
  fallback.ts
types/
  membrane.ts
```

以下のコンポーネントは独立画面としては不要。

```text
IncomingRequestCard.tsx
ProcessingTimeline.tsx
RoleLensPreview.tsx
RealityGate.tsx
AgentTrace.tsx
```

ただし、これらの要素は `SwipeRealityGate.tsx` 内の状態・演出として再利用する。

---

## 受け入れ基準

## デモとして合格

* 3分以内に登壇依頼シナリオを最後まで見せられる
* 審査員が「Private / Public / Business の境界」を一目で理解できる
* Reality Gate の価値が伝わる
* Agent Trace で、単なる自動生成ではなく境界判断していることが分かる
* APIが失敗してもフォールバックでデモ継続できる
* スマートグラス完成形のイメージが最後に伝わる
* UIがSaaSダッシュボード、管理画面、チャット画面に見えない
* 貼付画像の方向性に沿って、黒に近い背景、薄い光の膜、最小限の文字で見える
* 上部には `Personal AGI Membrane` と承認待ち件数だけが表示される
* Private / Public / Business の3つの円が、依頼の触れている領域を示すインジケーターとして見える
* 登壇依頼では Business が最も明るく、Public が中程度、Private が控えめに見える
* 中央の判断表示が、SaaS的なカードではなく空間に浮かぶ判断文に見える
* 登壇依頼の判断表示を右スワイプすると承認済みになる
* 登壇依頼の判断表示を左スワイプすると停止済みになる
* 登壇依頼の判断表示を下スワイプすると音声入力UIが出る
* 音声またはテキスト指示を送ると Reality Gate 判断表示が再生成される
* 長押しで Agent Trace の要約が同じ画面上に出る
* Agent Trace は通常時に見えず、長押し時だけ半透明オーバーレイで重なる
* 左右下の大きな矢印や明確な承認ボタンが表示されない
* いずれの操作でも画面遷移しない
* 3分デモ中、ユーザー操作はスワイプと長押しだけで成立する

## プロダクトとして合格

* ユーザーが「AIに全部任せる」ではなく「AIが整理し、人間が最後にスワイプで同意する」体験になっている
* Private情報を安易にBusiness/Publicへ渡さない
* 現実を変える行為が必ずReality Gateを通る
* Agent Trace が説明責任を担っている
* 4シナリオへ拡張できる構造になっている

---

## 実装順序

## Phase 1: 静的デモ

目的: APIなしで3分デモを成立させる。

1. Next.jsプロジェクト作成
2. Swipe Reality Gate 画面
3. 登壇依頼シナリオの固定データ
4. Membrane Orbs
5. Reality Gate Card
6. 右/左/下スワイプ状態
7. Trace Overlay
8. Glass Preview

この段階でピッチに最低限出せる。

## Phase 2: AI生成

目的: 「今のAIで動いている」感を出す。

1. `/api/analyze` 作成
2. OpenAI API接続
3. 構造化JSON出力
4. API失敗時のフォールバック
5. 生成結果をUIに反映
6. `/api/revise-gate` 作成
7. 下スワイプの音声指示で Reality Gate を再生成

## Phase 3: 4シナリオ化

目的: 一発ネタではなくプロダクトに見せる。

1. イベント参加/SNS投稿
2. 名刺交換
3. 紹介依頼
4. シナリオ切り替え

## Phase 4: ピッチ磨き込み

目的: 審査員に刺さる見せ方にする。

1. 3分デモモード
2. ローディング演出
3. スマホ表示確認
4. スワイプ/長押し操作の実機確認
5. 眼鏡モックのビジュアル調整
6. ピッチ台本作成

---

## ピッチ台本

### 0:00-0:30 問題提起

「AGIが現実になる世界では、AIはチャット画面の中に留まりません。人間の代わりに依頼を受け、予定を確認し、発信を準備し、他者のAIと接触します。その時に必要なのは、より賢い返答ではなく、人間の境界です。」

### 0:30-1:00 プロダクト説明

「Personal AGI Membrane は、個人を Private / Public / Business の3つのAGI膜で守ります。外部から来る依頼を、それぞれの膜が判断し、現実を変える直前だけReality Gateで人間に承認を求めます。」

### 1:00-2:30 デモ

「登壇依頼が届きました。Business AGIは条件を確認します。Private AGIには空き時間だけ確認し、予定名は渡しません。Public AGIはSNS投稿の公開範囲を確認します。Reality Gateでは、AIが整理した判断を空間に浮かぶ短い判断文として受け取ります。右へスワイプすればYes。左へスワイプすればNo。条件を足したい時は下へスワイプして、音声で指示します。人間は長い会話ログを読むのではなく、現実を変える直前の判断だけを行います。」

### 2:30-3:00 Trace

「不安な時だけ判断文を長押しします。同じ画面上にAgent Traceの要約が重なり、どのAIが何を参照し、何を渡し、何を渡さなかったかが分かります。これは自動化ではなく、現実変更前の同意と監査です。」

### 3:00-3:30 未来像

「今はスマホで作ります。しかし完成形はスマートグラスです。目の前の人、イベント、名刺、会話の上に、AGIの判断が薄く重なる。Reality changes only when you allow it. これがポストAGI時代の個人インターフェースです。」

---

## 判断メモ

* MVPでは「本物の複数自律エージェント」より「3つの判断が1つの Reality Gate 判断表示に安定して集約されるUI」を優先する
* 生成AIの見せ場は、長文生成ではなく、境界判断と短い承認文生成
* OpenAI APIは、Structured OutputsでUI表示用のJSONを返す設計が向いている
* 将来の本格実装では、Agents SDKのような手段で個別エージェント、handoff、guardrails、human reviewを拡張する
* デモでは「AIがすごい」ではなく「AIが社会へ出る時、人間の境界が必要」という市場仮説を伝える
* UI名は Swipe Reality Gate とする

---

## 参考

* OpenAI Structured Outputs: https://developers.openai.com/api/docs/guides/structured-outputs
* OpenAI Agents: https://developers.openai.com/api/docs/guides/agents
* Series T応募提案書: ./SeriesT応募提案書_Personal_AGI_Membrane.md
* 元コンセプト: ./コンセプトシート01.md
