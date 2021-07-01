# youtube-api

## プロジェクトのクローン

```Shell
git clone https://github.com/NwHub/youtube-api.git
```

```Shell
cd youtube-api
```

## プロジェクトセットアップ

```Shell
npm install
```

# メモ：どうやって作ったの？

```Shell
mkdir youtube-api
npm i -D prettier json-server
```

package.json に以下を追加

```json
  "scripts": {
    "format": "prettier --write .",
    "json-server": "json-server --watch mock/youtube.json"
  },
```

`mock/youtube.json`を作成
