

const CategoryNotFound= (props) => {

    return <>
    <div className="page-not-found">
        <div className="code">404</div>
        <div className="text">SORRY! VIDEO IN THIS {props.name} CAN’T BE FOUND.</div>
        
    </div>
    
    </>

}

export default CategoryNotFound