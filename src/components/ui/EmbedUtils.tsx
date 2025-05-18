/**
 * embedUtils.ts
 *
 * Utility functions for processing and validating URLs for embedding content
 * like YouTube videos and Twitter tweets.
 */

/**
 * Extracts a YouTube Video ID from various YouTube URL formats.
 * @param url The YouTube URL string.
 * @returns The YouTube Video ID string, or null if no valid ID can be extracted.
 */
 export const extractYouTubeVideoId = (url: string): string | null => {
  if (!url) return null;
  let videoId: string | null = null;

  try {
    const urlObj = new URL(url); // Throws an error if the URL is invalid

    // Standard watch URLs: https://www.youtube.com/watch?v=dQw4w9WgXcQ
    // youtube.com
    if ((urlObj.hostname === "www.youtube.com" || urlObj.hostname === "youtube.com") && urlObj.pathname === "/watch") {
      videoId = urlObj.searchParams.get("v");
    }
    // Shortened URLs: https://m.youtube.com/1
    else if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.substring(1); // Remove the leading '/'
    }
    // Embed URLs: https://www.youtube.com/embed/VIDEO_ID
    else if (urlObj.hostname === "www.youtube.com" && urlObj.pathname.startsWith("/embed/")) {
      videoId = urlObj.pathname.substring("/embed/".length);
    }
    // Add other known valid YouTube URL patterns here if necessary

  } catch (error) {
    // This error means the URL string itself was malformed, not that it wasn't a YouTube URL.
    console.error("Malformed URL provided to extractYouTubeVideoId:", url, error);
    return null;
  }

  // Validate the extracted videoId (basic check for typical length and characters)
  // YouTube video IDs are 11 characters long and only contain alphanumeric characters, underscores, and hyphens
  const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;
  if (videoId && YOUTUBE_ID_REGEX.test(videoId)) {
    return videoId;
  }
  // If the original URL itself could be a direct video ID (and not a full URL)
  if (YOUTUBE_ID_REGEX.test(url)) {
      return url;
  }

  console.warn("Could not extract a valid YouTube Video ID from URL:", url);
  return null;
};


/**
 * Generates an embeddable YouTube URL from a given YouTube link or Video ID.
 * @param urlOrId The YouTube URL string or a direct Video ID.
 * @returns The embeddable YouTube URL string, or null if the URL/ID is invalid.
 */
export const getYouTubeEmbedUrl = (urlOrId: string): string | null => {
  const videoId = extractYouTubeVideoId(urlOrId);

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`; // Correct embed format
  }
  return null;
};

/**
 * Transforms a Twitter URL to ensure it uses 'twitter.com' for embedding.
 * Twitter's embed widget works best with 'twitter.com' links.
 *
 * @param url The Twitter URL string.
 * @returns The transformed Twitter URL string, or an empty string if the input is invalid.
 */
export const getTwitterEmbedLink = (url: string): string => {
  if (!url) return "";
  try {
    const urlObj = new URL(url); // Validate if it's a plausible URL
    // Check if it's a Twitter or X domain
    if (urlObj.hostname === "twitter.com" || urlObj.hostname === "www.twitter.com" ||
        urlObj.hostname === "x.com" || urlObj.hostname === "www.x.com") {
      return url.replace("x.com", "twitter.com");
    }
    console.warn("URL does not appear to be a Twitter/X URL:", url);
    return "";
  } catch (error) {
    console.error("Invalid URL for Twitter link:", url, error);
    return "";
  }
};
