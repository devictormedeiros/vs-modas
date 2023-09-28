import { useState, useEffect } from 'react';

const Counter = () => {
    const [count, setCount] = useState<number>(0);
    const [date, setDate] = useState<Date | null>(null);

    const handClick = () => {
        setCount((valor) => valor + 1);
    };

    const handDate = () => {
        setDate(new Date());
    };

    useEffect(() => {
        if(count > 0 ){
        console.log('Entrou no useffect');
        }
    }, []);

    useEffect(() => {
        if(count > 0 ){
        console.log('Ação', count, date);
        return () => {
            console.log('Limpeza', count, date);
        }
        }
    }, [count, date]);

    return (
        <div>
        <p>{count}</p>
        <p>{date?.toLocaleString()}</p>
        <button disabled={count === 10} onClick={handClick}>Somar</button>
        <button onClick={() => handDate()}>Nova data</button>

        </div>
    );
    }
export default Counter;
