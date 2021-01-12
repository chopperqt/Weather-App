//styles
import './style.css';

const Preloader = () => {
    return (
        <div className="container__max">
            <div className="container__weather">
                <h2 className="preloader__item"></h2>
                <h2 className="preloader__item"></h2>
                <h2 className="preloader__item"></h2>
                <h2 className="preloader__item"></h2>
            </div>
        </div>
        
    );
}
 
export default Preloader;