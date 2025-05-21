import { Jaro, Chivo } from 'next/font/google';
import Link from 'next/link';

const jaro = Jaro({ weight: '400', subsets: ['latin'] });

const chivo = Chivo({
  weight: ['400', '500'],
  subsets: ['latin'],
});

export default function Hero() {
  return (
    <section className="text-center space-y-5 py-20 px-4">
      <h1 className={`${jaro.className} text-4xl md:text-5xl font-semibold`}>
        Before You Text Them
      </h1>

      <p className="text-lg md:text-xl max-w-xl mx-auto">
        You’ve come so far. Take a breath before you break the silence.
      </p>

      <img
        src="/Hero-Image.png"
        alt="Supportive visual for no contact"
        className="mx-auto w-40 md:w-48 lg:w-56 max-w-full"
      />

<Link href="/reflection">
  <button className="bg-transparent outline outline-2 outline-white-500 text-white-500 hover:bg-rose-400 font-medium px-6 py-3 rounded-full shadow glow-button transition duration-200 cursor-pointer">
    I want to text them...
  </button>
</Link>
    </section>
  );
}
