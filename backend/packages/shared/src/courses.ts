import type { LanguageCode } from "./languages.js";

/** A course teaches `to` to someone who already speaks `from`. */
export interface CourseDefinition {
  readonly from: LanguageCode;
  readonly to: LanguageCode;
}

/** Languages whose speakers learn English. */
const ENGLISH_LEARNER_LANGUAGES = [
  "zh",
  "ja",
  "ko",
  "es",
  "tr",
  "fr",
  "nl",
  "de",
  "it",
  "pl",
  "sv",
] as const satisfies readonly LanguageCode[];

/** The 12 courses: English speakers learn Hindi; the other 11 languages learn English. */
export const COURSES: readonly CourseDefinition[] = [
  { from: "en", to: "hi" },
  ...ENGLISH_LEARNER_LANGUAGES.map((from) => ({ from, to: "en" as const })),
];

/** Stable string id for a course, e.g. "ja-en". */
export function courseCode(course: CourseDefinition): string {
  return `${course.from}-${course.to}`;
}

export function findCourse(from: LanguageCode, to: LanguageCode): CourseDefinition | undefined {
  return COURSES.find((c) => c.from === from && c.to === to);
}

/** Courses available to someone whose native language is `nativeLanguage`. */
export function coursesFor(nativeLanguage: LanguageCode): CourseDefinition[] {
  return COURSES.filter((c) => c.from === nativeLanguage);
}
