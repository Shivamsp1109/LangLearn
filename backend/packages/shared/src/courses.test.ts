import { describe, expect, it } from "vitest";
import { COURSES, courseCode, coursesFor, findCourse } from "./courses.js";
import { LANGUAGE_CODES, LANGUAGES, isLanguageCode } from "./languages.js";

describe("languages", () => {
  it("supports exactly 13 languages", () => {
    expect(LANGUAGE_CODES).toHaveLength(13);
  });

  it("recognises valid codes and rejects everything else", () => {
    expect(isLanguageCode("ja")).toBe(true);
    expect(isLanguageCode("xx")).toBe(false);
    expect(isLanguageCode("toString")).toBe(false); // inherited property, not a language
  });
});

describe("courses", () => {
  it("has 12 courses", () => {
    expect(COURSES).toHaveLength(12);
  });

  it("only uses supported languages and never teaches a language to its own speakers", () => {
    for (const course of COURSES) {
      expect(LANGUAGES[course.from]).toBeDefined();
      expect(LANGUAGES[course.to]).toBeDefined();
      expect(course.from).not.toBe(course.to);
    }
  });

  it("has no duplicate courses", () => {
    const codes = COURSES.map(courseCode);
    expect(new Set(codes).size).toBe(codes.length);
  });

  it("teaches Hindi only to English speakers", () => {
    expect(COURSES.filter((c) => c.to === "hi")).toEqual([{ from: "en", to: "hi" }]);
  });

  it("finds courses by language pair", () => {
    expect(findCourse("ja", "en")).toEqual({ from: "ja", to: "en" });
    expect(findCourse("en", "ja")).toBeUndefined();
  });

  it("lists the courses for a native language", () => {
    expect(coursesFor("en")).toEqual([{ from: "en", to: "hi" }]);
    expect(coursesFor("hi")).toEqual([]);
  });
});
