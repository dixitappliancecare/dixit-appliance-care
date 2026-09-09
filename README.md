# Dixit Appliance Care – Complete Website

Official brand: **Dixit Appliance Care**.

## Gallery: automatic from GitHub
Gallery categories are fetched automatically from the public GitHub repository using the GitHub Contents API:

- `gallery/service-center/`
- `gallery/ac/`
- `gallery/fridge/`
- `gallery/washing-machine/`
- `gallery/ro/`

Supported formats: JPG, JPEG, PNG and WEBP. There is **no filename manifest**. Add an image to the correct folder, commit and push; the gallery discovers it automatically. Browser caching reduces unnecessary API requests.

Repository configuration is in `script.js` and currently targets `dixitappliancecare/dixit-appliance-care` on `main`. If your GitHub repository or branch changes, update the `GALLERY_REPOSITORY` object.

## Other included improvements
- Premium responsive gallery with full-screen preview
- Keyboard-friendly dialogs and focus states
- Reduced-motion support
- Lazy-loaded gallery images
- Loading, empty and error/retry states
- Existing SEO, service pages and responsive design preserved

## Important
No website can guarantee a permanent #1 Google position. SEO content and service coverage are designed to improve relevance while avoiding hidden keyword stuffing.

## Automatic Gallery (No filenames to edit)
The gallery automatically reads these folders from the same public GitHub repository used by the website:
- `gallery/service-center/`
- `gallery/ac/`
- `gallery/fridge/`
- `gallery/washing-machine/`
- `gallery/ro/`

To add photos, upload JPG, JPEG, PNG or WEBP files into the matching folder and commit/push. Do not edit JavaScript or add image filenames.

### Important
The GitHub repository must be public because the browser reads the folder through GitHub's public Contents API. The gallery automatically detects the GitHub owner and repository from the deployed GitHub Pages/canonical URL and does not require a hardcoded branch name.
