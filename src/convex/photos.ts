import { action } from "./_generated/server";

const FOLDER_ID = "1DcfnewQGuZcDfIJX08VpCsoys82x7uJK";
const FOLDER_URL = `https://drive.google.com/drive/folders/${FOLDER_ID}`;

export const fetchPhotos = action({
  args: {},
  handler: async () => {
    // Fetch the public folder page HTML
    const response = await fetch(FOLDER_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Google Drive folder: ${response.status}`);
    }

    const html = await response.text();

    // Extract file IDs from the page source.
    // Google Drive embeds file data in script tags and data attributes.
    // Pattern 1: Look for file IDs in the encoded data (Google Drive uses a specific pattern)
    const fileIdRegex = /\["(1[a-zA-Z0-9_-]{20,50})"/g;
    const fileIds = new Set<string>();
    let match;
    while ((match = fileIdRegex.exec(html)) !== null) {
      fileIds.add(match[1]);
    }

    // Pattern 2: Also look for data-id attributes
    const dataIdRegex = /data-id="([a-zA-Z0-9_-]{20,50})"/g;
    while ((match = dataIdRegex.exec(html)) !== null) {
      fileIds.add(match[1]);
    }

    // Pattern 3: Look for /file/d/ patterns
    const fileDRegex = /\/file\/d\/([a-zA-Z0-9_-]{20,50})/g;
    while ((match = fileDRegex.exec(html)) !== null) {
      fileIds.add(match[1]);
    }

    // Build photo objects with view and download URLs
    const photos = Array.from(fileIds).map((id, index) => ({
      id,
      index,
      viewUrl: `https://drive.google.com/uc?export=view&id=${id}`,
      downloadUrl: `https://drive.google.com/uc?export=download&id=${id}`,
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w400`,
    }));

    return photos;
  },
});
