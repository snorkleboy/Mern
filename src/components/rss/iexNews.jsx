import React from 'react';
import '../../css/iex-news.css';

export default function({article}){
    function display(e){
        const el = document.getElementById(article.headline)
        el.classList.add("article-visible")
        setTimeout(() => el.classList.add("article-transition"),0);
        
    }
    function unDisplay(e){
        const el = document.getElementById(article.headline)
        el.classList.remove("article-visible");
        el.classList.remove("article-transition");
    }
    return (
        <article className="iex-article">
            <a onMouseEnter={display} onMouseLeave={unDisplay} href={article.url}>
                <span>  --  {article.headline}</span>
                <span id={article.headline} onMouseLeave={unDisplay} className="article-tooltip">
                    {Date(article.datetime).toLocalTimeString}
                    {article.source}
                    {article.summary}
                </span>
            </a>
        </article>
    )
}