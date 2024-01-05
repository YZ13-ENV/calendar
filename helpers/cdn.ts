export const cdn = (link: string): string => {
    const stableLink = link.startsWith('/') ? link.substring(1) : link
    const fetchUrl = `https://cdn.darkmaterial.space/${stableLink}`
    return fetchUrl
}
