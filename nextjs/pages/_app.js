// import { Html, Head, Main, NextScript } from 'next/document'

// export default function Document() {
//     return (
//         <Html>
//             <Head>
//                 <script src="https://telegram.org/js/telegram-web-app.js" />
//             </Head>
//             <body>
//                 <Main />
//                 <NextScript />
//             </body>
//         </Html>
//     )
// }

import { useEffect } from 'react';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Ensure the script is loaded before accessing window.Telegram
        if (window.Telegram?.WebApp) {
            console.log('Telegram WebApp is ready');
            window.Telegram.WebApp.ready();
        }
    }, []);

    return (
        <>
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                strategy="beforeInteractive"
            />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;