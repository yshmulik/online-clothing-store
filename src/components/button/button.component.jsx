import"./button.styles.scss";
export default function Button({children,buttonType,...otherprops}){
    return(
        <button className={`button-container ${buttonType}`}
        {...otherprops}>
        {children}
        </button>
    )
}