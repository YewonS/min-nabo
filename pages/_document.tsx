import Document, { Head, Html, Main, NextScript } from "next/document";


class CustomDocument extends Document {
    render(): JSX.Element {
        return( 
            <Html lang="en">
                <Head>
                    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro&display=swap" rel="stylesheet"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;