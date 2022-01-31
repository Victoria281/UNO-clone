import "./background.scss"

const BackgroundAnimation = () => {

    var rows = [];

    const ObjectRow = () => {
        return(
        <div className="circle-container">
            <div className="circle"></div>
        </div>)
    }

    for (var i = 0; i < 100; i++) {
        rows.push(ObjectRow());
    }

    return (
        <div>
            {rows}
        </div>
    )

}

export default BackgroundAnimation;