import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type Props = {}

const Lottie: React.FC<Props>  = ({}) => {
    return(
        <div className="">
            <DotLottieReact
                src="/not-found.lottie"
                loop
                autoplay
            />
        </div>
    )
}

export default Lottie;