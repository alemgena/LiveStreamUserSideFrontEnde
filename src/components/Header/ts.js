/*handleSearch(companies).map((company, index) => {
    return (
      <Link
        key={index}
        to={{
          pathname: /companies/${company.Catagory?.name}/${company.name},
          state: { item: company },
        }}
        style={{ textDecoration: "none" }}
      >
        <div className="search_result">
          <Typography variant="h6">
            {" "}
            {company.name.charAt(0).toUpperCase() +
              company.name.slice(1)}
          </Typography>
          <div style={{ color: "rgba(244,151,3,.8)" }}>
            {" "}
            <span>Catagory :- </span>
            {company.Catagory?.name
              .charAt(0)
              .toUpperCase() +
              company.Catagory?.name.slice(1)}
          </div>
        </div>
      </Link>
    );
  })*/