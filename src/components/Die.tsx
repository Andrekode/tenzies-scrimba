interface DieProps {
    value: number;
    isHeld: boolean;
    holdDice: (id: string) => void;
    id: string;
}

export default function Die(props: DieProps) {
    const { value, isHeld, holdDice, id } = props;
    const styles = {
        backgroundColor: isHeld ? '#59E391' : 'white',
    };

    return (
        <div className='die-box' id={id} style={styles} onClick={holdDice}>
            <h2 className='die-num'>{value}</h2>
        </div>
    );
}
