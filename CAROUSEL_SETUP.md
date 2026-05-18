# Carousel Photos Setup Guide

Your "What We Do" carousel is now configured to **read photos from a Google Sheet** instead of manually uploading files.

## How It Works

### 1. **Google Sheet Structure**
Create a Google Sheet with the following columns:

| caption           | image                                  | alt (optional)        |
|-------------------|----------------------------------------|-----------------------|
| Education Team    | https://example.com/education.jpg      | School classroom      |
| Delivery Fleet    | https://example.com/delivery.jpg       | Delivery trucks       |
| Cleaning Service  | https://example.com/cleaning.jpg       | Professional cleaners |

**Sheet Name:** `Carousel` (can be customized)

### 2. **Column Names (flexible matching)**
The system is smart about finding columns - it accepts:
- **Image URL:** `image`, `image url`, `photo`, `photo url`, `image_url`
- **Caption:** `caption`, `title`, `heading`
- **Alt Text:** `alt`, `alt text`, `alt description` (optional)

### 3. **Where to Put Image URLs**
You have these options:
- **Cloudinary URLs** (recommended): `https://res.cloudinary.com/...`
- **AWS S3 URLs**: `https://your-bucket.s3.amazonaws.com/...`
- **Google Drive**: Share link converted to direct image URL
- **Any public image hosting**

### 4. **Environment Variables**
Add one of these to your `.env.local`:

```env
CAROUSEL_GOOGLE_SHEET_ID=YOUR_SHEET_ID_HERE
```

OR if you want to use the same sheet as your blog:
```env
BLOG_GOOGLE_SHEET_ID=YOUR_SHEET_ID_HERE
```

The carousel will use `CAROUSEL_GOOGLE_SHEET_ID` first, then fall back to `BLOG_GOOGLE_SHEET_ID`.

### 5. **Get Your Sheet ID**
From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j/edit
                                     ^^^^^^^^^^^^^^^^^^^^^^^^
                                     This is your SHEET_ID
```

### 6. **Make the Sheet Public**
1. Open your Google Sheet
2. Click **Share** → **Change to "Anyone with the link can view"**
3. Keep it public (no sign-in required)

## Fallback Behavior

If no Google Sheet is configured or it's empty, the carousel automatically falls back to these branded SVGs:
- 📚 `/brand/what-we-do/education.svg`
- 🚚 `/brand/what-we-do/logistics.svg`
- 🧹 `/brand/what-we-do/cleaning.svg`

## How to Update Photos

1. **Open your Google Sheet**
2. **Add or edit rows** with new captions and image URLs
3. **Save** (automatic)
4. **Website updates** within 60 seconds (due to caching)

No code changes, no file uploads, no redeployment needed! 🎉

## Example Google Sheet Setup

Here's a working template you can copy:

```
Sheet Name: Carousel

Row 1 (Headers):
caption | image | alt

Row 2:
Our Training Programs | https://example.com/training.jpg | Students in classroom

Row 3:
Reliable Delivery Network | https://example.com/delivery.jpg | Delivery vehicles

Row 4:
Professional Cleaning Services | https://example.com/cleaning.jpg | Cleaning team at work
```

## Troubleshooting

**Photos not showing?**
- ✓ Sheet is public (Anyone with link can view)
- ✓ Sheet ID is correct in `.env.local`
- ✓ Image URLs are publicly accessible (test by pasting in browser)
- ✓ Column headers are spelled correctly (or contain the key words)

**Still seeing branded SVGs?**
- Sheet ID not set → configure `CAROUSEL_GOOGLE_SHEET_ID` or `BLOG_GOOGLE_SHEET_ID`
- Sheet is empty → add rows with `caption` and `image` columns
- Sheet name is wrong → default is `Carousel`, can customize in code

## Code Reference

**File:** `src/lib/sheets.ts`
- Function: `getCarouselPhotosFromSheet(sheetId, { sheetName })`
- Used in: `src/app/page.tsx`
- Component: `src/components/WhatWeDoCarousel.tsx`

---

**Ready to set up? Create your Google Sheet and add the SHEET_ID to `.env.local`!**
