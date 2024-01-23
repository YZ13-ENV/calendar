'use client'
import { ChangeEvent, DetailedHTMLProps, ElementRef, TextareaHTMLAttributes, useLayoutEffect, useRef } from 'react'

const defaultStyle: React.CSSProperties = {
    resize: 'none',
    outline: 'none',
    display: 'block',
    overflow: 'hidden',
    backgroundColor: 'transparent'
};
const Textarea = (props: DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>) => {
    const ref = useRef<ElementRef<'textarea'>>(null);
    const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (props.onChange) props.onChange(e)
        if (ref.current) {
            ref.current.style.height = "40px";
            const scrollHeight = ref.current.scrollHeight;
            ref.current.style.height = scrollHeight + "px";
        }
    }
    useLayoutEffect(() => {
        const area = ref.current
        if (props.value && area) {
            ref.current.style.height = "40px";
            const scrollHeight = ref.current.scrollHeight;
            ref.current.style.height = scrollHeight + "px";
        }
    },[props.value, ref])
    return (
        <textarea {...props} ref={ref} onChange={onChange} style={{...defaultStyle}} />
    )
}

export default Textarea