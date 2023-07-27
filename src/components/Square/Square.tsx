import './Square.css'
export default function Square(props: { 
    value: string; //displays the value of either X, O, or null (based on state)
    onClick: () => void; //clicking changes the value of X, O, or null where the state is stored on board
}) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

