/**
 * Every language the app supports, keyed by its ISO 639-1 code.
 *
 * `as const` freezes the literal values so TypeScript can derive the
 * `LanguageCode` union type below from this data, keeping data and types in sync.
 */
export const LANGUAGES = {
  en: { name: "English", nativeName: "English", script: "Latin" },
  hi: { name: "Hindi", nativeName: "हिन्दी", script: "Devanagari" },
  zh: { name: "Chinese (Mandarin)", nativeName: "中文", script: "Han" },
  ja: { name: "Japanese", nativeName: "日本語", script: "Japanese" },
  ko: { name: "Korean", nativeName: "한국어", script: "Hangul" },
  es: { name: "Spanish", nativeName: "Español", script: "Latin" },
  tr: { name: "Turkish", nativeName: "Türkçe", script: "Latin" },
  fr: { name: "French", nativeName: "Français", script: "Latin" },
  nl: { name: "Dutch", nativeName: "Nederlands", script: "Latin" },
  de: { name: "German", nativeName: "Deutsch", script: "Latin" },
  it: { name: "Italian", nativeName: "Italiano", script: "Latin" },
  pl: { name: "Polish", nativeName: "Polski", script: "Latin" },
  sv: { name: "Swedish", nativeName: "Svenska", script: "Latin" },
} as const;

/** Union of all supported codes: "en" | "hi" | "zh" | ... */
export type LanguageCode = keyof typeof LANGUAGES;

export const LANGUAGE_CODES = Object.keys(LANGUAGES) as LanguageCode[];

/**
 * Type guard: narrows an untrusted string (e.g. from a request) to LanguageCode.
 * `Object.hasOwn` avoids matching inherited keys like "toString".
 */
export function isLanguageCode(value: string): value is LanguageCode {
  return Object.hasOwn(LANGUAGES, value);
}
