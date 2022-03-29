import React from 'react'

function Search() {
    return (
        <div className='searchBar'>
            <form className="search-bar">		
	<input style={{backgroundColor:" #121212",width:"400px"}} type="search" placeholder="Search .." name="search"/>
	<button className="search-btn" type="submit">
		<span>Search</span>
	</button>
</form>
        </div>
    )
}

export default Search
