/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
  locales: ["pl", "no", "en"],
  sourceLocale: "en",
  catalogs: [
    {
      path: "src/locales/{locale}/messages",
      include: ["src"],
    },
  ],
  format: "po",
};
