import React from 'react';
import '../../css/iex-news.css';

export default function({article}){

    return (
        <article className="iex-article">
            <a href={article.url}>
                <span>{article.headline}</span>
                <span className="article-tooltip">
                    {Date(article.datetime).toLocalTimeString}
                    {article.source}
                    {article.summary}
                </span>
            </a>
        </article>
    )
}