import { useLoading } from '../../context/loadingContext';
import './style.scss'

const Loading = () => {

    const {isVisible} = useLoading();

    if(!isVisible){
        return null;
    }
    return (
        <div className="loading w-100 d-flex justify-content-center">
            <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="" />
        </div>
    );
};

export default Loading;