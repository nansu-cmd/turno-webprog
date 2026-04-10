import { Link } from 'react-router-dom';
import Button from '../components/Button';

function NotFoundPage() {
    return (
        <div className="flex min-h-[75vh] w-full flex-col items-center justify-center px-4 py-16">
            <div className="flex max-w-2xl flex-col items-center text-center rounded-[2rem] border-2 border-zinc-900 bg-zinc-50 p-12 shadow-[12px_12px_0px_0px_rgba(24,24,27,1)]">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Error 404
                </p>
                
                <h1 className="text-4xl font-extrabold leading-tight text-zinc-900 sm:text-6xl">
                    Lost in the Mist
                </h1>

                {/* UPDATED: Larger, themed image container */}
                <div className="my-10 aspect-video w-full max-w-md overflow-hidden rounded-2xl border-4 border-zinc-900 bg-zinc-200 shadow-lg">
                    <img 
                        src="https://preview.redd.it/mist-guardian-chrome-mukuro-or-both-v0-1ywooo0nrc3f1.png?auto=webp&s=a96eb85170161b8de9035d8804e4944d02f8cdb9" 
                        alt="Mist Guardian Chrome Dokuro" 
                        className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
                    />
                </div>
                
                <p className="mt-2 max-w-md text-lg leading-7 text-zinc-600">
                    The intel you are looking for has been obscured by a Mist Guardian's illusion, or it simply doesn't exist in the Famiglia archives.
                </p>
                
                <div className="mt-10">
                    <Link to="/">
                        <Button className="px-10 py-4 text-lg">Return to Base</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;