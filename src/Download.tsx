import WebApp from "mk-start-sdk";
import { toast } from "sonner";

type Props = {}

const Download: React.FC<Props> = ({}) => {
    const handleClick = () => {
        WebApp.downloadFile(
            { url: 'vite.svg', file_name: "vite.svg" },
            (isAccepted) => {
                if (!isAccepted) {
                    toast.error("User declined the download");
                }
            }
        );
    }
    return(
        <div>
            <button
                type="button"
                onClick={handleClick}
                style={{
                    width: "300px",
                    height: "50px",
                    fontSize: "18px",
                }}
            >
                Download SVG with SDK
            </button>
            <a
                href="vite.svg"
                download
                type="button"
                style={{
                    border: "2px solid black",
                    display: "flex",
                    width: "300px",
                    height: "50px",
                    justifyContent: "center",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "black",
                    backgroundColor: "white"
                }}
            >
                Download SVG without SDK
            </a>
        </div>
    )
}

export default Download;