import './style.css';

//material UI
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

//uniq id
import {v4 as uuidv4} from 'uuid';

//react-router-dom
import {NavLink} from 'react-router-dom';

//images
import City from '../../materials/city.png'

import {AlertError} from '../../components'
import { useState, useEffect ,useContext} from 'react';
import { AlertContext } from '../Alert/AlertContext';

const userStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '350px',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3)
    },
    inputWidth: {
        width: '100%'
    }
}));

const Cities = ({
        open, 
        addCity, 
        handleClose,
        changeAddInput,
        cityArray,
        inputValue,
        error,
        errorMessage,
        setError,
        setError2
    }) => {

    const classes = userStyles();
    const [modalOpen,setModalOpen] = useState(false);


    function handleModal() {
        setModalOpen(prev => !prev)
    }

    function closeErrorMessage() {
        
    }

    useEffect(() => {
        let button = document.querySelector('.addBtn');

        button.addEventListener('click', handleModal)

        return () => {
            button.removeEventListener('click', handleModal)
        }
    }, [modalOpen])

    const al = useContext(AlertContext);


    return (
        <div className="cities">
            <Button className="addBtn" variant="contained" color="primary" alt="Click to add City">Добавить город</Button>
            <div className="modal__container">
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={modalOpen}
                    onClose={handleModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={modalOpen}>
                        <div className={classes.paper}>
                            <div>
                                <TextField className={classes.inputWidth} id="outlined-basic" width="500" label="Город" variant="outlined" defaultValue=""  ref={inputValue} />
                            </div>
                            {error ? <AlertError message={errorMessage} setError={setError} /> : null }
                            <div className="buttonsAdd">
                                <Button onClick={addCity} variant="contained" color="primary">Add</Button>
                                <Button onClick={handleModal} variant="contained" color="secondary">Close</Button>
                            </div>
                        </div>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}
 
export default Cities;