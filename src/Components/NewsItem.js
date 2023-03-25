import React from 'react'

const NewsItem = (props) => {
    let { title, description, imageUrl, newsUrl, author, date, sourceName } = props;
    return (
        <div className="my-3">
            <div className="card">
                <img src={imageUrl ? imageUrl : "https://www.hindustantimes.com/ht-img/img/2023/03/21/1600x900/rainfall_activity_in_northwest_northeast_india_1679359529950_1679359530151_1679359530151.jpg"} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}
                        <span className="position-absolute top-0 end-0 translate-right badge rounded-pill bg-danger" style={{ zindex: 1 }}>
                            {sourceName}
                        </span>
                    </h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {author} on {new Date(date).toGMTString()}</small></p>
                    <a rel="noreferrer" href={newsUrl ? newsUrl : "/#"} target="_blank" className="btn btn-dark btn-sm">Read More</a >
                </div>
            </div>
        </div>
    )
}

export default NewsItem