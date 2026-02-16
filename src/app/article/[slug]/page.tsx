import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticleBySlug, getLatestArticles } from '@/data/mock';
import ArticleCard from '@/components/ArticleCard';

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getLatestArticles(4).filter(a => a.id !== article.id).slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6">
        <ol className="flex items-center gap-2 text-gray-500">
          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
          <li>/</li>
          <li><Link href={`/${article.category}`} className="hover:text-blue-600 capitalize">{article.category}</Link></li>
          <li>/</li>
          <li className="text-gray-900 truncate max-w-xs">{article.title}</li>
        </ol>
      </nav>

      {/* Category Badge */}
      <div className="mb-4">
        <Link
          href={`/${article.category}`}
          className="inline-block bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded uppercase hover:bg-blue-700 transition"
        >
          {article.category}
        </Link>
        {article.subcategory && (
          <span className="ml-2 text-gray-500 text-sm">{article.subcategory}</span>
        )}
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
        {article.title}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <Image
            src={article.author.avatar}
            alt={article.author.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-semibold text-gray-900">{article.author.name}</p>
            <p>{formatDate(article.publishedAt)}</p>
          </div>
        </div>
        <span className="text-gray-400">|</span>
        <span>{article.views.toLocaleString()} views</span>
      </div>

      {/* Featured Image */}
      <div className="relative h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Article Content */}
      <div
        className="prose prose-lg max-w-none mb-8"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {article.tags.map((tag) => (
          <Link
            key={tag}
            href={`/search?q=${encodeURIComponent(tag)}`}
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition"
          >
            #{tag}
          </Link>
        ))}
      </div>

      {/* Author Bio */}
      <div className="bg-gray-100 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-4">
          <Image
            src={article.author.avatar}
            alt={article.author.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{article.author.name}</h3>
            {article.author.bio && (
              <p className="text-gray-600 text-sm mt-1">{article.author.bio}</p>
            )}
            {article.author.social && (
              <div className="flex gap-3 mt-2">
                {article.author.social.twitter && (
                  <a href={`https://twitter.com/${article.author.social.twitter}`} className="text-blue-500 text-sm hover:underline">
                    Twitter
                  </a>
                )}
                {article.author.social.linkedin && (
                  <a href={`https://linkedin.com/in/${article.author.social.linkedin}`} className="text-blue-700 text-sm hover:underline">
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="flex items-center gap-4 mb-12">
        <span className="font-semibold text-gray-900">Share:</span>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-500 transition text-sm"
        >
          Twitter
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          Facebook
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900 transition text-sm"
        >
          LinkedIn
        </a>
      </div>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <ArticleCard key={relatedArticle.id} article={relatedArticle} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
