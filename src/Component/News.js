import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "US",
    pagesize: 15,
    category: "general"
  }
  static propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
    document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1) } NewIndex`
  }

  async UpdateNews() {
    this.props.setProgress(0);
    this.setState({ loading: true })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pagesize=${this.props.pagesize
      }&page=${this.state.page}`;
    let data = await fetch(url);
    this.props.setProgress(30);
    let parseData = await data.json();
    this.props.setProgress(50);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.UpdateNews();
  }
 
  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f0cb83611ab94446806291256d9cd577&pagesize=${this.props.pagesize
      }&page=${this.state.page+1}`;
    this.setState({ page: this.state.page + 1 });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parseData.articles),
      totalResults: parseData.totalResults
   
    });
  };
  render() {
    return (   
      <>    
        {console.log(this.props.apiKey)}  
          {this.state.loading && <Spinner />}
          <h2 className='text-center' style={{ margin: '35px 0px' }}>NewsIndex - Top  {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)}  Headlines</h2>
          
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length!==this.state.totalResults}
            loader={<h4><Spinner /></h4>}
          >
          <div className="container my-3">

            <div className="row">
              {!this.state.loading && this.state.articles.map((element) => {
                return (
                  <div className="col-3" key={element.url}>
                    <NewsItem
                      title={element.title}
                      description={element.description}
                      ImageUrl={element.urlToImage}
                      link={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
            </div>
          </InfiniteScroll>
                  {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-sm btn-dark"
            onClick={this.handleprevClcik}
          >
            &larr; Previous
          </button>
          <button
            className="btn btn-sm btn-dark"
            onClick={this.handleNextClcik}
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pagesize)
            }
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News
