import React from "react";

interface IPhaserProps
{
    app: Phaser.Game
}

export default function PhaserComponent(props: IPhaserProps): React.ReactElement
{
    const app: Phaser.Game = props.app;
    const container = React.useRef<HTMLDivElement>(null);

    React.useLayoutEffect(() =>
    {
        if (container !== null && container.current)
        {
            container.current.append(app.canvas);
        }

        return () =>
        {
            if (container !== null)
            {
                if (container.current)
                {
                    container.current.removeChild(app.canvas);
                }
            }
        };
    }, [container, app]);

    return <div ref={container}/>;
}