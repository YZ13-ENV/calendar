'use client'
import { file } from '@/api/file'
import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'

type VariantProps = { dark: string, light: string, size?: number }
type RemoteLogoProps = VariantProps & Partial<ImageProps>

const RemoteLogo = (props: RemoteLogoProps) => {
    const width = props.size ? props.size : props.width
    const height = props.size ? props.size : props.height
    const [loading, setLoading] = useState<boolean>(true)
    const [darkVariant, setDarkVariant] = useState<string | null>(null)
    const [lightVariant, setLightVariant] = useState<string | null>(null)
    const fetchDarkVariant = async() => {
        const variant = await file.static.get(props.dark)
        setDarkVariant(variant)
    }
    const fetchLightVariant = async() => {
        const variant = await file.static.get(props.light)
        setLightVariant(variant)
    }
    const fetchVariants = async() => {
        setLoading(true)
        Promise.all([ fetchDarkVariant(), fetchLightVariant() ])
        setLoading(false)
    }
    useEffect(() => {
        fetchVariants()
    },[])
    if (!loading && (!darkVariant && !lightVariant)) return null
    if (loading) return <div style={{ width: props.width ? props.width : 24, height: props.height ? props.height : 24 }} 
    className='rounded-full shrink-0 bg-muted animate-pulse' />
    if (!darkVariant || !lightVariant) return null
    return (
        <>
            {/* dark-mode logo */}
            <Image className='hidden dark:block' src={darkVariant} width={width} height={height} alt={props.alt || 'remote-logo'} />
            {/* light-mode logo */}
            <Image className='block dark:hidden' src={lightVariant} width={width} height={height} alt={props.alt || 'remote-logo'} />
        </>
    )
}

export default RemoteLogo