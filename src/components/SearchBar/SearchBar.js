import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            term:      '',
            location:  '',
            sortBy:    'best_match'
        };

        this.handleSortByChange =this.handleSortByChange.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch =this.handleSearch.bind(this);
        this.handleKeyPress =this.handleKeyPress.bind(this);

        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count'
        }
    }

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption){
            return 'active';
        }
        return '';
    }

    handleSortByChange(sortByOption) {
        this.setState({sortBy: sortByOption},()=> {this.props.searchYelp(this.state.term,this.state.location,this.state.sortBy)})
    }

    handleTermChange(event) {
        this.setState({term: event.target.value})
    }

    handleLocationChange(event) {
        this.setState({location: event.target.value})

    }

    handleSearch(event) {
        this.props.searchYelp(this.state.term,this.state.location,this.state.sortBy)
        event.preventDefault()
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.handleSearch(event);
        }
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li onClick={() => this.handleSortByChange(sortByOptionValue)}  className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>;
        });
    }

    render() {
        return (
            <div class="SearchBar">
                <div class="SearchBar-sort-options">
                    <ul>
                        {this.renderSortByOptions()}
                    </ul>
                </div>
                <div class="SearchBar-fields">
                    <input onChange={this.handleTermChange} onKeyPress={this.handleKeyPress} placeholder="Search Businesses" />
                    <input onChange={this.handleLocationChange} onKeyPress={this.handleKeyPress} placeholder="Where?" />
                </div>
                <div class="SearchBar-submit">
                    <a  onClick={this.handleSearch} >Let's Go</a>
                </div>
            </div>
        );
    }
}


export default SearchBar;