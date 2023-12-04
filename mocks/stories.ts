import { Story } from "@/types";

export const mockStories: Story[] = [
  {
    title: "Story 1",
    slug: "story-1",
    level: "lett",
    description: "This is the first story",
    imageURI: "https://picsum.photos/200",
    versions: [
      {
        version: "1.0",
        reader: "Reader 1",
        text: {
          whole: "This is the whole text of the story",
          phrases: [
            {
              phrase: "This is a phrase",
              timeStart: 0,
              timeEnd: 10,
            },
            {
              phrase: "This is another phrase",
              timeStart: 11,
              timeEnd: 20,
            },
          ],
        },
        wordCount: 10,
        time: 20,
        audioURI:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      },
    ],
  },
  {
    title: "Story 2",
    slug: "story-2",
    level: "ganske-tungt",
    description: "This is the second story",
    imageURI: "https://picsum.photos/200",
    versions: [
      {
        version: "1.0",
        reader: "Reader 2",
        text: {
          whole: "This is the whole text of the second story",
          phrases: [
            {
              phrase: "This is a phrase from the second story",
              timeStart: 0,
              timeEnd: 10,
            },
            {
              phrase: "This is another phrase from the second story",
              timeStart: 11,
              timeEnd: 20,
            },
          ],
        },
        wordCount: 12,
        time: 25,
        audioURI:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
    ],
  },
  {
    title: "Story 3",
    slug: "story-3",
    level: "hardt",
    description: "This is the second story",
    imageURI: "https://picsum.photos/200",
    versions: [
      {
        version: "1.0",
        reader: "Reader 2",
        text: {
          whole: "This is the whole text of the second story",
          phrases: [
            {
              phrase: "This is a phrase from the second story",
              timeStart: 0,
              timeEnd: 10,
            },
            {
              phrase: "This is another phrase from the second story",
              timeStart: 11,
              timeEnd: 20,
            },
          ],
        },
        wordCount: 12,
        time: 25,
        audioURI:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      },
    ],
  },
  {
    title: "Story 4",
    slug: "story-4",
    level: "lett",
    description: "This is the second story",
    imageURI: "https://picsum.photos/200",
    versions: [
      {
        version: "1.0",
        reader: "Reader 2",
        text: {
          whole: "This is the whole text of the second story",
          phrases: [
            {
              phrase: "This is a phrase from the second story",
              timeStart: 0,
              timeEnd: 10,
            },
            {
              phrase: "This is another phrase from the second story",
              timeStart: 11,
              timeEnd: 20,
            },
          ],
        },
        wordCount: 12,
        time: 25,
        audioURI:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      },
    ],
  },
  {
    title: "Story 5",
    slug: "story-5",
    level: "ganske-tungt",
    description: "This is the second story",
    imageURI: "https://picsum.photos/200",
    versions: [
      {
        version: "1.0",
        reader: "Reader 2",
        text: {
          whole: "This is the whole text of the second story",
          phrases: [
            {
              phrase: "This is a phrase from the second story",
              timeStart: 0,
              timeEnd: 10,
            },
            {
              phrase: "This is another phrase from the second story",
              timeStart: 11,
              timeEnd: 20,
            },
          ],
        },
        wordCount: 12,
        time: 25,
        audioURI:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      },
    ],
  },
  {
    title: "Story 6",
    slug: "story-6",
    level: "hardt",
    description: "This is the second story",
    imageURI: "https://picsum.photos/200",
    versions: [
      {
        version: "1.0",
        reader: "Reader 2",
        text: {
          whole: "This is the whole text of the second story",
          phrases: [
            {
              phrase: "This is a phrase from the second story",
              timeStart: 0,
              timeEnd: 10,
            },
            {
              phrase: "This is another phrase from the second story",
              timeStart: 11,
              timeEnd: 20,
            },
          ],
        },
        wordCount: 12,
        time: 25,
        audioURI:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      },
    ],
  },
  {
    title: "Story 7",
    slug: "story-7",
    level: "lett",
    description: "This is the second story",
    imageURI: "https://picsum.photos/200",
    versions: [
      {
        version: "1.0",
        reader: "Reader 2",
        text: {
          whole: "This is the whole text of the second story",
          phrases: [
            {
              phrase: "This is a phrase from the second story",
              timeStart: 0,
              timeEnd: 10,
            },
            {
              phrase: "This is another phrase from the second story",
              timeStart: 11,
              timeEnd: 20,
            },
          ],
        },
        wordCount: 12,
        time: 25,
        audioURI:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      },
    ],
  },
  {
    title: "Story 8",
    slug: "story-8",
    level: "ganske-tungt",
    description: "This is the second story",
    imageURI: "https://picsum.photos/200",
    versions: [
      {
        version: "1.0",
        reader: "Reader 2",
        text: {
          whole: "This is the whole text of the second story",
          phrases: [
            {
              phrase: "This is a phrase from the second story",
              timeStart: 0,
              timeEnd: 10,
            },
            {
              phrase: "This is another phrase from the second story",
              timeStart: 11,
              timeEnd: 20,
            },
          ],
        },
        wordCount: 12,
        time: 25,
        audioURI:
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
      },
    ],
  },
];

// export in json format
export const mockStoriesJSON = JSON.stringify(mockStories);
