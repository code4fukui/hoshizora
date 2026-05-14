# hoshizora

日本全国の星空保護区と星空観察データを地図上にマッピングするウェブアプリケーションです。

## デモ

- **[日本の星空保護区マップ](https://code4fukui.github.io/hoshizora/)**
  - 日本国内の公式な「星空保護区（International Dark Sky Places）」の位置を示すインタラクティブマップ。

- **[日本の星空観察結果マップ（最高値）](https://code4fukui.github.io/hoshizora/maxmagmap.html)**
  - 環境省のデータに基づき、全国で記録された最も状態の良い（暗い）夜空の観測結果を可視化したマップ。

## 機能

-   **インタラクティブマップ**: 日本の星空保護区と観測データを探索できる2種類のマップ。
-   **星空保護区**: DarkSky Internationalが公式に認定した日本国内の公園や島などの位置を表示。
-   **観測データの可視化**: 環境省の星空観察データをプロット。夜空の明るさ（等級）によってポイントが色分けされており、最も暗い場所を簡単に見つけることができます。
    -   **色分け（等級）**: 赤: 21〜, オレンジ: 20〜, 黄: 19〜, 緑: 18〜, 青: 〜18。等級の数値が大きいほど、より暗く澄んだ空であることを示します。
-   **データ処理パイプライン**: 最新の公式観測データをダウンロード、クレンジング、処理するためのスクリプトを同梱。

## 使い方

本プロジェクトではデータ処理に[Deno](https://deno.land/)を使用しています。最新の観測データでマップを更新するには、以下のスクリプトを順番に実行してください。

1.  **生データのダウンロード**
    環境省のサイトから最新の観測データ（CSV）をスクレイピングしてダウンロードします。
    ```bash
    deno run --allow-net --allow-write download.js
    ```

2.  **全結果の集約**
    ダウンロードした複数のCSVを結合し、1つの正規化されたファイル（`hoshizora_result/result_all.csv`）を作成します。
    ```bash
    deno run --allow-net --allow-read --allow-write makeResultAll.js
    ```

3.  **マップデータの生成**
    集約したデータを処理して各地点の最も状態の良い（暗い）観測結果を抽出し、マップ表示用の色分け情報を付与します（`hoshizora_result/result_maxmag.csv`）。
    ```bash
    deno run --allow-net --allow-read --allow-write makeResultMaxMag.js
    ```

## データソース

-   [DarkSky International | Protecting the night skies](https://darksky.org/)
-   [星空保護区（International Dark Sky Places）](https://hoshizorahogoku.org/)
-   [環境省 星空観察 観察結果](https://www.env.go.jp/air/life/hoshizorakansatsu/observe-4.html)

## ライセンス

MIT License — 詳細は [LICENSE](LICENSE) を参照してください。
