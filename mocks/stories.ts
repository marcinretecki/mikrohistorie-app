import { Story } from "@/types";

export const mockStories: Story[] = [
  {
    title: "Story 1",
    slug: "story-1",
    level: "lett",
    description: "This is the first story hehe :D",
    imageURI: "https://picsum.photos/200",
    translations: {
      pl: "This is the whole text of the story. This is the whole text of the story. This is the whole text of the story. This is the whole text of the story. This is the whole text of the story. This is the whole text of the story. This is the whole text of the story. This is the whole text of the story",
    },
    versions: [
      {
        version: "Østnorsk",
        reader: "Ola Nordmann",
        text: {
          whole:
            "This is the whole text of the story. This is the whole text of the story. This is the whole text of the story. This is the whole text of the story. This is the whole text of the story. This is the whole text of the story. This is the whole text of the story. This is the whole text of the story",

          phrases: [
            {
              phrase: "This is a phrase",
              timeStart: 0,
              timeEnd: 1000,
            },
            {
              phrase: "This is another phrase",
              timeStart: 1000,
              timeEnd: 2000,
            },
            {
              phrase: "This is another phrase",
              timeStart: 2000,
              timeEnd: 3000,
            },
            {
              phrase: "This is another phrase",
              timeStart: 3000,
              timeEnd: 4000,
            },
            {
              phrase: "This is another phrase",
              timeStart: 4000,
              timeEnd: 5000,
            },
            {
              phrase: "This is another phrase",
              timeStart: 5000,
              timeEnd: 6000,
            },
            {
              phrase: "This is another phrase",
              timeStart: 5000,
              timeEnd: 6000,
            },
            {
              phrase: "This is another phrase",
              timeStart: 5000,
              timeEnd: 6000,
            },
            {
              phrase: "This is another phrase",
              timeStart: 5000,
              timeEnd: 6000,
            },
            {
              phrase: "This is another phrase",
              timeStart: 11,
              timeEnd: 20,
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
      {
        version: "Ålesundsk",
        reader: "Kari Nordmann",
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
          "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      },
    ],
  },
  {
    title: "Story 2",
    slug: "story-2",
    level: "ganske-tungt",
    description: "This is the second story",
    imageURI: "https://picsum.photos/200",
    translations: {
      pl: "To jest cały tekst opowiadania",
    },
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
    translations: {
      pl: "To jest cały tekst opowiadania",
    },
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
    translations: {
      pl: "To jest cały tekst opowiadania",
    },
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
    translations: {
      pl: "To jest cały tekst opowiadania",
    },
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
    translations: {
      pl: "To jest cały tekst opowiadania",
    },
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
    translations: {
      pl: "To jest cały tekst opowiadania",
    },
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
    translations: {
      pl: "To jest cały tekst opowiadania",
    },
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
