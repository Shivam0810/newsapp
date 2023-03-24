import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general",
        setProgress: () => { }
    }
    
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        setProgress: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalArticleCount: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalArticleCount: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalArticleCount: parsedData.totalResults,
            loading: false
        });
    }

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: "30px" }}>News Monket Top {this.capitalizeFirstLetter(this.props.category)} Headline</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length < this.state.totalArticleCount}
                    loader={<Spinner />}
                >
                    <div className="container row">
                        {this.state.articles.map((articleElement, index) => {
                            return <div className="col-md-4" key={index} >
                                <NewsItem title={articleElement.title.split("-").slice(0, -1)} description={articleElement.description} imageUrl={articleElement.urlToImage} newsUrl={articleElement.url} author={articleElement.author ? articleElement.author : "Unknown"} date={articleElement.publishedAt} sourceName={articleElement.source.name} />
                            </div>
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News