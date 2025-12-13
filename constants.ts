import { Adaptation, Author, Review } from './types';

export const INITIAL_ADAPTATIONS: Adaptation[] = [
  {
    id: '1',
    bookTitle: 'Dune',
    movieTitle: 'Dune: Part One',
    author: 'Frank Herbert',
    releaseYear: '2021',
    genre: ['Sci-Fi', 'Adventure', 'Epic'],
    moods: ['Intense', 'Epic', 'Philosophical'],
    famousQuote: "I must not fear. Fear is the mind-killer. Fear is the little-death that brings total obliteration.",
    comparisonSummary: "The book relies heavily on internal monologue to explain the politics; the movie uses breathtaking visuals and sound design to convey the scale.",
    spoilerAnalysis: "The movie ends abruptly after the jamis duel, leaving out the time jump and Feyd-Rautha. The book explores the ecology of Arrakis in much deeper detail which the movie glosses over for pacing.",
    isFamous: true,
    
    // Book
    coverUrl: 'https://picsum.photos/seed/dune/300/450',
    bookDescription: "Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, must travel to the most dangerous planet in the universe to ensure the future of his family and his people.",
    targetAudience: "Adult",
    bookRating: 4.8,
    originalLanguage: "English",
    bookReleaseYear: "1965",
    readLink: "#",
    buyLink: "https://amazon.com",

    // Movie
    moviePosterUrl: 'https://picsum.photos/seed/dune-movie/300/450',
    movieDescription: "A noble family becomes embroiled in a war for control over the galaxy's most valuable asset while its heir becomes troubled by visions of a dark future.",
    director: "Denis Villeneuve",
    cast: ["Timothée Chalamet", "Rebecca Ferguson", "Oscar Isaac"],
    movieTargetAudience: "Adults/Teens",
    movieRating: 4.6,
    trailerUrl: "https://youtube.com",
    ottLink: "https://www.max.com"
  },
  {
    id: '2',
    bookTitle: 'Pride and Prejudice',
    movieTitle: 'Pride & Prejudice',
    author: 'Jane Austen',
    releaseYear: '2005',
    genre: ['Romance', 'Drama', 'Classic'],
    moods: ['Romantic', 'Witty', 'Feel-good'],
    famousQuote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    comparisonSummary: "The novel is sharper and more satirical about class; the 2005 film is more romantic and visually stylized.",
    spoilerAnalysis: "The movie adds a romantic alternative ending for US audiences (the 'Mrs. Darcy' scene) which is not in the book. The book focuses more on Lydia's scandal ramifications.",
    isFamous: true,

    // Book
    coverUrl: 'https://picsum.photos/seed/pride/300/450',
    bookDescription: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.",
    targetAudience: "Adult / YA",
    bookRating: 4.9,
    originalLanguage: "English",
    bookReleaseYear: "1813",
    readLink: "#",
    buyLink: "https://amazon.com",

    // Movie
    moviePosterUrl: 'https://picsum.photos/seed/pride-movie/300/450',
    movieDescription: "Sparks fly when spirited Elizabeth Bennet meets single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.",
    director: "Joe Wright",
    cast: ["Keira Knightley", "Matthew Macfadyen"],
    movieTargetAudience: "General Audience",
    movieRating: 4.7,
    trailerUrl: "https://youtube.com",
    ottLink: "https://netflix.com"
  },
  {
    id: '3',
    bookTitle: 'The Lord of the Rings',
    movieTitle: 'The Fellowship of the Ring',
    author: 'J.R.R. Tolkien',
    releaseYear: '2001',
    genre: ['Fantasy', 'Adventure', 'Action'],
    moods: ['Epic', 'Adventurous', 'Hopeful'],
    famousQuote: "Not all those who wander are lost.",
    comparisonSummary: "Tolkien's songs and Tom Bombadil are missing, but the film masters the pacing and action sequences needed for cinema.",
    spoilerAnalysis: "Arwen replaces Glorfindel in the movie. The timeline is compressed significantly (Gandalf is gone for years in the book). The ending of the movie Fellowship covers the beginning of the Two Towers book.",
    isFamous: true,

    // Book
    coverUrl: 'https://picsum.photos/seed/lotr/300/450',
    bookDescription: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    targetAudience: "All Ages",
    bookRating: 5.0,
    originalLanguage: "English",
    bookReleaseYear: "1954",
    readLink: "#",
    buyLink: "https://amazon.com",

    // Movie
    moviePosterUrl: 'https://picsum.photos/seed/lotr-movie/300/450',
    movieDescription: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    director: "Peter Jackson",
    cast: ["Elijah Wood", "Ian McKellen", "Viggo Mortensen"],
    movieTargetAudience: "Teens/Adults",
    movieRating: 4.9,
    trailerUrl: "https://youtube.com",
    ottLink: "https://primevideo.com"
  },
  {
    id: '4',
    bookTitle: 'The Godfather',
    movieTitle: 'The Godfather',
    author: 'Mario Puzo',
    releaseYear: '1972',
    genre: ['Crime', 'Drama'],
    moods: ['Dark', 'Intense', 'Classic'],
    famousQuote: "I'm gonna make him an offer he can't refuse.",
    comparisonSummary: "The movie elevates the source material, removing some of the book's pulpier subplots to focus on the family tragedy.",
    spoilerAnalysis: "The book contains a subplot about Lucy Mancini's surgery which is completely removed from the film. The movie ending is more abrupt and powerful regarding Kay's realization.",
    isFamous: true,

    coverUrl: 'https://picsum.photos/seed/godfather/300/450',
    bookDescription: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    targetAudience: "Adult",
    bookRating: 4.5,
    originalLanguage: "English",
    bookReleaseYear: "1969",
    buyLink: "https://amazon.com",

    moviePosterUrl: 'https://picsum.photos/seed/godfather-movie/300/450',
    movieDescription: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino"],
    movieTargetAudience: "Adults",
    movieRating: 5.0,
    trailerUrl: "#",
    ottLink: "#"
  },
  {
    id: '5',
    bookTitle: 'Harry Potter',
    movieTitle: "HP & The Sorcerer's Stone",
    author: 'J.K. Rowling',
    releaseYear: '2001',
    genre: ['Fantasy', 'Family'],
    moods: ['Magical', 'Childhood', 'Fun'],
    famousQuote: "It does not do to dwell on dreams and forget to live.",
    comparisonSummary: "Very faithful adaptation, though Peeves the Poltergeist is notably absent.",
    isFamous: true,
    
    coverUrl: 'https://picsum.photos/seed/harry/300/450',
    bookDescription: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
    targetAudience: "Children / YA",
    bookRating: 4.8,
    originalLanguage: "English",
    bookReleaseYear: "1997",
    buyLink: "https://amazon.com",

    moviePosterUrl: 'https://picsum.photos/seed/harry-movie/300/450',
    director: "Chris Columbus",
    cast: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
    movieTargetAudience: "Children/Family",
    movieRating: 4.7,
    trailerUrl: "#",
    ottLink: "#"
  },
  {
    id: '6',
    bookTitle: 'The Shining',
    movieTitle: 'The Shining',
    author: 'Stephen King',
    releaseYear: '1980',
    genre: ['Horror', 'Thriller'],
    moods: ['Terrifying', 'Psychological', 'Dark'],
    famousQuote: "All work and no play makes Jack a dull boy.",
    comparisonSummary: "King wrote a tragedy about a good man flawed by addiction; Kubrick made a cold, precise horror about a man who hates his family.",
    spoilerAnalysis: "The book ends with the hotel exploding due to the boiler; the movie ends with Jack freezing to death in the maze. Hallorann survives in the book but dies in the movie.",
    isFamous: true,

    coverUrl: 'https://picsum.photos/seed/shining/300/450',
    bookDescription: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.",
    targetAudience: "Adult",
    bookRating: 4.6,
    originalLanguage: "English",
    bookReleaseYear: "1977",
    buyLink: "https://amazon.com",

    moviePosterUrl: 'https://picsum.photos/seed/shining-movie/300/450',
    director: "Stanley Kubrick",
    cast: ["Jack Nicholson", "Shelley Duvall"],
    movieTargetAudience: "Adults",
    movieRating: 4.8,
    trailerUrl: "#",
    ottLink: "#"
  },
  {
    id: '7',
    bookTitle: 'Gone Girl',
    movieTitle: 'Gone Girl',
    author: 'Gillian Flynn',
    releaseYear: '2014',
    genre: ['Thriller', 'Mystery'],
    moods: ['Twisted', 'Suspenseful', 'Dark'],
    famousQuote: "Marriage is hard work.",
    comparisonSummary: "The movie keeps the twist intact and uses the author's own screenplay, ensuring the tone matches perfectly.",
    isFamous: false,
    
    coverUrl: 'https://picsum.photos/seed/gonegirl/300/450',
    bookDescription: "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him.",
    targetAudience: "Adult",
    bookRating: 4.1,
    originalLanguage: "English",
    bookReleaseYear: "2012",
    buyLink: "https://amazon.com",

    moviePosterUrl: 'https://picsum.photos/seed/gonegirl-movie/300/450',
    director: "David Fincher",
    cast: ["Ben Affleck", "Rosamund Pike"],
    movieTargetAudience: "Adults",
    movieRating: 4.5,
    trailerUrl: "#",
    ottLink: "#"
  }
];

export const INITIAL_AUTHORS: Author[] = [
  {
    id: 'a1',
    name: 'Frank Herbert',
    bio: "Franklin Patrick Herbert Jr. was an American science fiction author best known for the 1965 novel Dune and its five sequels.",
    imageUrl: 'https://picsum.photos/seed/herbert/200/200',
    notableWorks: ['Dune', 'Dune Messiah', 'Children of Dune']
  },
  {
    id: 'a2',
    name: 'Jane Austen',
    bio: "Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique and comment upon the British landed gentry at the end of the 18th century.",
    imageUrl: 'https://picsum.photos/seed/austen/200/200',
    notableWorks: ['Pride and Prejudice', 'Sense and Sensibility', 'Emma']
  },
  {
    id: 'a3',
    name: 'J.R.R. Tolkien',
    bio: "John Ronald Reuel Tolkien was an English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings.",
    imageUrl: 'https://picsum.photos/seed/tolkien/200/200',
    notableWorks: ['The Hobbit', 'The Lord of the Rings', 'The Silmarillion']
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Alice M.',
    rating: 5,
    comment: "The Dune movie really captured the scale of the book. Villeneuve is a genius!",
    itemId: '1',
    itemName: 'Dune',
    date: '2023-10-15'
  },
  {
    id: 'r2',
    userName: 'BookWorm99',
    rating: 4,
    comment: "I still prefer the internal monologues in the book, but the 2005 movie was beautiful.",
    itemId: '2',
    itemName: 'Pride & Prejudice',
    date: '2023-11-02'
  }
];