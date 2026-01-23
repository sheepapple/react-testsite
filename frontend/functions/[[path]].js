export async function onRequest(context) {
    const url = new URL(context.request.url);

    // Redirect /projects/aniclips to the other Pages site
    if (url.pathname.startsWith('/projects/aniclips')) {
        const newPath = url.pathname.replace('/projects/aniclips', '') || '/';
        return Response.redirect(`https://aniclips.pages.dev${newPath}`, 301);
    }

    // Pass through to Astro site
    return context.next();
}