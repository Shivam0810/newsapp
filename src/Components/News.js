import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import parsedData from './exampleOutput.json'

const News = (props) => {
    const [page, setPage] = useState(1)
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [totalArticleCount, setTotalArticleCount] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async function updateNews() {
        props.setProgress(0);
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        //  setLoading(true);
        // let data = await fetch(url);
        // let parsedData = await data.json();
        setArticles(parsedData.articles);
        setTotalArticleCount(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;
        updateNews();
        // eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {
        // const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1);
        // let data = await fetch(url);
        // let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalArticleCount(parsedData.totalResults);
        setLoading(false);
    }

    return (
        <div className="container my-3">
            <h1 className="text-center" style={{ marginTop: "60px" }}>News Monket Top {capitalizeFirstLetter(props.category)} Headline</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length < totalArticleCount}
                loader={<Spinner />}
            >
                <div className="container row">
                    {articles.map((articleElement, index) => {
                        return <div className="col-md-4" key={index} >
                            <NewsItem title={articleElement.title.split("-").slice(0, -1)} description={articleElement.description} imageUrl={articleElement.urlToImage} newsUrl={articleElement.url} author={articleElement.author ? articleElement.author : "Unknown"} date={articleElement.publishedAt} sourceName={articleElement.source.name} />
                        </div>
                    })}
                </div>
            </InfiniteScroll>
        </div>
    )
}
News.defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
    setProgress: () => { }
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func
}
export default News