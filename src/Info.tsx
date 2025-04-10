import WebApp from 'mk-start-sdk';
type Props = {}

const Info: React.FC<Props> = ({}) => {
    return(
        <div 
            style={{
                color: WebApp.colorScheme === "dark" ? "white" : "black",
                width: "100vw",
                overflowX: "hidden"
            }}
        >
            <p>
                isExpanded: {WebApp.isExpanded}
            </p>
            <p>
                Viewport height: {WebApp.viewportHeight}
            </p>
            <p>
                Viewport stable height: {WebApp.viewportStableHeight}
            </p>
            <p>
                Platform: {WebApp.platform}
            </p>
            <p>
                Header color: {WebApp.headerColor}
            </p>
            <p>
                Background color: {WebApp.backgroundColor}
            </p>
            <p>
                Bottom bar color: {WebApp.bottomBarColor}
            </p>
            <p>
                Is closing confirmatiom enabled: {WebApp.isClosingConfirmationEnabled}
            </p>
            <p>
                Init data: {WebApp.initData}
            </p>
            <p>
                Color scheme: {WebApp.colorScheme}
            </p>
            <p>
                Version: {WebApp.version}
            </p>
            <p>
                Is vertical swipe enabled: {WebApp.isVerticalSwipesEnabled}
            </p>
            <p>
                Is active: {WebApp.isActive}
            </p>
            <p>
                Is fullscreen: {WebApp.isFullscreen}
            </p>
            <p>
                Is orientation locked: {WebApp.isOrientationLocked}
            </p>
            <p>
                Is orientation locked: {WebApp.isOrientationLocked}
            </p>
        </div>
    )
}

export default Info;