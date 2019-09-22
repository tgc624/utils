import { hankakuByZenkakuDictionary, zenkaku2hankaku } from "@/utils/hankaku";

describe("hankaku", () => {
  describe("hankakuByZenkakuDictionary", () => {
    it(`has all keys of zenkaku-katakana.`, () => {
      expect(Object.keys(hankakuByZenkakuDictionary).length).toBe(
        "ヶ".charCodeAt(0) - "ァ".charCodeAt(0)
      );
    });
  });
  describe(zenkaku2hankaku.name, () => {
    it(`replaces zenkaku to hankaku.`, () => {
      expect(zenkaku2hankaku("ナニヌネノマミムメモ")).toBe("ﾅﾆﾇﾈﾉﾏﾐﾑﾒﾓ");
    });
  });
});
