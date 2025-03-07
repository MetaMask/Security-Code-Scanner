// All of these are defaults except singleQuote, but we specify them
// for explicitness
const config = {
  quoteProps: 'as-needed',
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  plugins: [
    'prettier-plugin-packagejson',
    'prettier-plugin-sh',
  ],
};

export default config;
