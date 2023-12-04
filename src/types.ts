export type Stories = Story[];

export type Story = {
  title: string;
  slug: string;
  level: "lett" | "ganske-tungt" | "hardt";
  description: string;
  imageURI: string;
  versions: StoryVersion[];
};

export type StoryVersion = {
  version: string;
  reader: string;
  text: StoryText;
  wordCount: number;
  time: number;
  audioURI: string;
};

export type StoryText = {
  whole: string;
  phrases: StoryPhrase[];
};

export type StoryPhrase = {
  phrase: string;
  timeStart: number;
  timeEnd: number;
};

export type Indicator = {
  time: number;
  wordCount: number;
  step: 0 | 1 | 2 | 3;
};
