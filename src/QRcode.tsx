import WebApp from "mk-start-sdk";
import { useRef } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";

type Props = {}

const QRCodeGenerator: React.FC<Props> = ({}) => {
    const qrRef = useRef<SVGSVGElement>(null);

    // async function downloadBlobFile(blobUrl: any, fileName: any) {
    //     try {
    //         // Fetch the blob
    //         const response = await fetch(blobUrl);
    //         const blob = await response.blob();
            
    //         // Convert blob to data URL
    //         const reader = new FileReader();
    //         reader.readAsDataURL(blob);
    //         reader.onloadend = function() {
    //             const dataUrl = reader.result;
    //             // Now use WebApp.downloadFile with the data URL
    //             console.log("Blob function:", dataUrl)
    //             WebApp.downloadFile({
    //                 url: dataUrl,
    //                 file_name: fileName
    //             },
    //                 (isAccepted) => {
    //                     if (!isAccepted) {
    //                         toast.error("User declined the download");
    //                     }
    //                 }
    //             );
    //         };
    //     } catch (error) {
    //         console.error('Error downloading blob:', error);
    //     }
    // }

    const downloadQRCode = () => {
        if (!qrRef.current) {
            return;
        }

        // 1. Serialize the SVG to a string
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(qrRef.current);

        // 2. Create a base64‑encoded data URL for that SVG
        const svgBase64 = btoa(svgString);
        const imgSrc = `data:image/svg+xml;base64,${svgBase64}`;
        // 3. Draw it onto a canvas
        const img = new Image();
        img.onload = () => {
            // Use the SVG’s rendered dimensions
            const { width, height } = qrRef.current!.getBoundingClientRect();
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            if (!ctx) { 
                toast.error("No ctx")
                return;
            }
            ctx.drawImage(img, 0, 0, width, height);
            // 4. Convert canvas to a PNG blob
            canvas.toBlob((blob) => {
                if (!blob) {
                    return;
                }
                const url = URL.createObjectURL(blob);
                
                // For downloading in regular browser (test purpose)
                const a = document.createElement("a");
                a.href = url;
                a.download = "qrcode.png";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                // 5. Use Telegram.WebApp.downloadFile to prompt download
                console.log("Trying download:", url)
                // downloadBlobFile(url, "qrcode.png")
                WebApp.downloadFile(
                    { url: url, file_name: "qrcode.png" },
                    (isAccepted) => {
                        if (!isAccepted) {
                            toast.error("User declined the download");
                        }

                        URL.revokeObjectURL(url);
                    }
                );
            }, "image/png");
        };
        img.src = imgSrc;
    };
    return(
        <div className="flex flex-col items-center p-4">
            <QRCode
                ref={qrRef}
                value={"Some text"} 
                size={200} 
                fgColor="black" 
                bgColor="#ffffff"
            />
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault()
                    downloadQRCode()
                }}
            >
                Download
            </button>
        </div>
    )
}

export default QRCodeGenerator;