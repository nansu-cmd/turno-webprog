import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ArticleList from '../../components/ArticleList';
import { fetchArticles } from '../../services/ArticleService';

const ArticleListPage = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const { data } = await fetchArticles();
                if (cancelled) return;
                const list = (data.articles || [])
                    .filter((a) => a.isActive)
                    .map((a) => ({
                        name: a.slug,
                        title: a.title,
                        imageUrl: a.imageUrl,
                        content: a.paragraphs || [],
                    }));
                setArticles(list);
            } catch (err) {
                if (!cancelled) {
                    setError(err.response?.data?.message || 'Failed to load articles.');
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <div className="flex w-full flex-col gap-6">
            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Vongola Articles
                </p>
                <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
                    Chronicles of the Vongola Famiglia
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
                    Delve into the history, battles, and legacy of the most powerful mafia family in the underworld. From Giotto's era to the Tenth Generation.
                </p>
                <div className="mt-6">
                    <Button to="/">Back Home</Button>
                </div>
            </section>

            <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                <div className="mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                        Artifacts
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-zinc-900">Vongola Articles</h2>
                </div>

                {loading ? (
                    <p className="text-sm text-zinc-600">Loading articles…</p>
                ) : error ? (
                    <p className="text-sm font-semibold text-red-700">{error}</p>
                ) : articles.length === 0 ? (
                    <p className="text-sm text-zinc-600">No articles available yet.</p>
                ) : (
                    <ArticleList articles={articles} />
                )}
            </section>
        </div>
    );
}

export default ArticleListPage;
