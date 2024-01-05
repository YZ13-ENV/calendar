import { file } from '@/api/file'
import Image, { ImageProps } from 'next/image'

type VariantProps = { dark: string, light: string, size?: number }
type RemoteLogoProps = VariantProps & Partial<ImageProps>

const RemoteServerLogo = async(props: RemoteLogoProps) => {
    const width = props.size ? props.size : props.width
    const height = props.size ? props.size : props.height
    const darkVariant = await file.static.get(props.dark)
    const lightVariant = await file.static.get(props.light)
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

export default RemoteServerLogo