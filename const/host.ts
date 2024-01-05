export const api_host: string = 
// 'https://www.api.darkmaterial.space'
process.env.NODE_ENV === 'development' 
? process.env.NEXT_PUBLIC_API_HOST_DEV as string
: process.env.NEXT_PUBLIC_API_HOST_PROD as string
export const yz13_host: string = 'https://www.yz13.darkmaterial.space'
export const dm_family_host: string = 'https://www.darkmaterial.space'
export const notes_host: string = 'https://www.notes.darkmaterial.space'