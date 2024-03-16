import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google'
import '../styles/globals.css';

const inter = Inter({ subsets: ['latin'] })

/**
 * Renders the given component with the given page props.
 * @param Component The component to render.
 * @param pageProps The props to pass to the component.
 * @returns The rendered component
 */
function App({ Component, pageProps }: AppProps) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}

export default App;