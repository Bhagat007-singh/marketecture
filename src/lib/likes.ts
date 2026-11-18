'use client';

// Persistent client-side Like & Bookmark engine with localStorage

const LIKES_KEY = 'marketecture_likes_count';
const USER_LIKED_KEY = 'marketecture_user_liked';
const BOOKMARKS_KEY = 'marketecture_bookmarks';

// Base seed counts so the site feels active with realistic academic endorsement counts
const SEED_LIKES: Record<string, number> = {
  'boat-youth-lifestyle-audio': 142,
  'zepto-quick-commerce-speed': 189,
  'inshorts-news-brevity-product': 117,
  'amul-girl-topical-advertising': 324,
  'share-a-coke-personalisation': 288,
  'blinkit-billboard-breakdown': 205,
  'zomato-ipl-moment-marketing': 267,
  'apple-shot-on-iphone': 412,
  'nike-just-do-it-philosophy': 395,
  'paper-boat-drinks-memories': 178,
  'marketing-circle-introductions': 84,
};

export function getLikesCount(id: string): number {
  if (typeof window === 'undefined') return SEED_LIKES[id] || 42;
  try {
    const stored = localStorage.getItem(LIKES_KEY);
    const map: Record<string, number> = stored ? JSON.parse(stored) : {};
    if (typeof map[id] === 'number') return map[id];
    return SEED_LIKES[id] || 42;
  } catch {
    return SEED_LIKES[id] || 42;
  }
}

export function isItemLiked(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(USER_LIKED_KEY);
    const map: Record<string, boolean> = stored ? JSON.parse(stored) : {};
    return !!map[id];
  } catch {
    return false;
  }
}

export function toggleItemLike(id: string): { liked: boolean; count: number } {
  if (typeof window === 'undefined') return { liked: false, count: SEED_LIKES[id] || 42 };
  try {
    const userLikedStored = localStorage.getItem(USER_LIKED_KEY);
    const userMap: Record<string, boolean> = userLikedStored ? JSON.parse(userLikedStored) : {};
    const currentlyLiked = !!userMap[id];

    const currentCount = getLikesCount(id);
    const newLiked = !currentlyLiked;
    const newCount = newLiked ? currentCount + 1 : Math.max(0, currentCount - 1);

    userMap[id] = newLiked;
    localStorage.setItem(USER_LIKED_KEY, JSON.stringify(userMap));

    const countsStored = localStorage.getItem(LIKES_KEY);
    const countsMap: Record<string, number> = countsStored ? JSON.parse(countsStored) : {};
    countsMap[id] = newCount;
    localStorage.setItem(LIKES_KEY, JSON.stringify(countsMap));

    // Dispatch custom event for real-time sync across components on the page
    window.dispatchEvent(new CustomEvent('marketecture_like_updated', { detail: { id, liked: newLiked, count: newCount } }));

    return { liked: newLiked, count: newCount };
  } catch {
    return { liked: false, count: SEED_LIKES[id] || 42 };
  }
}

export function isItemBookmarked(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    const map: Record<string, boolean> = stored ? JSON.parse(stored) : {};
    return !!map[id];
  } catch {
    return false;
  }
}

export function toggleItemBookmark(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(BOOKMARKS_KEY);
    const map: Record<string, boolean> = stored ? JSON.parse(stored) : {};
    const newBookmarked = !map[id];
    map[id] = newBookmarked;
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(map));
    window.dispatchEvent(new CustomEvent('marketecture_bookmark_updated', { detail: { id, bookmarked: newBookmarked } }));
    return newBookmarked;
  } catch {
    return false;
  }
}
