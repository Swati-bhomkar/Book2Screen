export interface Adaptation {
  id: string;
  // Shared
  bookTitle: string;
  movieTitle: string;
  author: string;
  releaseYear: string; // Movie release year usually
  genre: string[];
  famousQuote: string;
  comparisonSummary?: string; // Non-spoiler summary
  spoilerAnalysis?: string;   // Spoiler content
  moods?: string[];           // For recommendations
  isFamous?: boolean;         // Controls visibility on Famous Novels page

  // Book Specifics
  coverUrl: string;
  bookDescription?: string;
  targetAudience?: string; // Book readers e.g. "Adult", "YA"
  bookRating?: number;     // e.g. 4.5
  originalLanguage?: string;
  bookReleaseYear?: string;
  readLink?: string;       // Link to read/preview
  buyLink?: string;        // Amazon/Flipkart link

  // Movie Specifics
  moviePosterUrl: string;
  movieType?: string;      // e.g. "Movie", "TV Series", "Miniseries"
  movieDescription?: string;
  director?: string;
  cast?: string[];
  movieTargetAudience?: string; // "Views" e.g. "Any age", "Adults"
  movieRating?: number;
  trailerUrl?: string;     // YouTube link
  ottLink?: string;        // Netflix/Prime link
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  notableWorks: string[];
}

export interface Review {
  id: string;
  userName: string;
  rating: number; // 1-5
  comment: string;
  itemId: string; // ID of the book/movie
  itemName: string;
  date: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  password?: string;
  bio: string;
  favoriteGenres: string[];
  role: 'admin' | 'user';
  avatarUrl?: string;
}

export interface UserProgress {
  [adaptationId: string]: {
    isFavoriteBook?: boolean;
    isFavoriteMovie?: boolean;
    isFavoriteAdaptation?: boolean; // General favorite
    isBookRead?: boolean;
    isMovieWatched?: boolean;
  }
}