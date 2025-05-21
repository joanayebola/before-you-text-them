import './globals.css';
import { Jaro, Chivo } from 'next/font/google';

const jaro = Jaro({
  weight: '400',
  subsets: ['latin'],
});

const chivo = Chivo({
  weight: ['400', '500'],
  subsets: ['latin'],
});



export const metadata = {
  title: 'Before You Text Them',
  description: 'Take a breath before you break the silence.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${chivo.className}`}
>
        {children}
      </body>
    </html>
  );
}
