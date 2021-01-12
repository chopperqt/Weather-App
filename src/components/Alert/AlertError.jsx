import {useContext} from 'react';
import Alert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles';
import { AlertContextToggle } from './AlertContext';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '10px'
    }
}));

const AlertError = ({message,setError}) => {

    const toggle = useContext(AlertContextToggle);

    const classes = useStyles();


    return (
        <Alert className={classes.root}  severity="error" onClose={setError} >Такой город уже есть!</Alert>
    );
}
 
export default AlertError;