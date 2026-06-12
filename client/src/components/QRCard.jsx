import { useEffect } from "react";
import { Html5QrcodeScanner }
from "html5-qrcode";

function QRScanner({

    onScanSuccess

}){

    useEffect(()=>{

        const scanner =
        new Html5QrcodeScanner(

            "reader",

            {

                fps:10,

                qrbox:250

            },

            false

        );

        scanner.render(

            (decodedText)=>{

                onScanSuccess(
                    decodedText
                );

                scanner.clear();

            },

            (error)=>{

            }

        );

        return ()=>{

            scanner.clear()
            .catch(()=>{});

        };

    },[]);

    return(

        <div
        id="reader"
        ></div>

    );

}

export default QRScanner;