import React from "react";


interface ButtonProps
{
    children: React.ReactNode,
    disabled?: boolean,
    className: string,
    href?: string,
    onClick: () => void,
}

export default function Button({children, disabled, className, href, onClick}: ButtonProps)
{
    const Tag = href ? 'a' : 'button'

    const onClickAction = (event: React.MouseEvent) =>
    {
        if (disabled)
        {
            event.preventDefault();
        } else
        {
            return onClick()
        }
    }

    return (
        <>
            <Tag className={className} onClick={(event: React.MouseEvent) =>
            {
                onClickAction(event)
            }} disabled={disabled}
                 href={href}>{children}</Tag>
        </>
    )
}

