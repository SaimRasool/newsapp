import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let{title,description,ImageUrl,link,author,date ,source}=this.props;
    return (
      <div className="card" >
        <div className="d-flex justify-content-end position-absolute end-0 ">
          <span className="badge rounded-pill bg-danger" style={{left:'90%',zindex:1}}>
          {source}
          <span className="visually-hidden">unread messages</span>
        </span>
        </div>
        
        <img
          src={
            ImageUrl
              ? ImageUrl
              : ""
          }
          className="card-img-top"
          alt="News"
        />
        <div className="card-body">
          <h5 className="card-title">{title} </h5>
          <p className="card-text">
            {description ? description.slice(0, 88) : ""}...
          </p>
          <p className="card-text"><small className="text-muted">By {author?author:"Unknown"} on {new Date(date).toGMTString()}</small></p>
          <a href={link} target="blank" className="btn btn-sm btn-dark">
            Read more
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
