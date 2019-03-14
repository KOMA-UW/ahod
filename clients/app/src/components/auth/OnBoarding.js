import React from 'react'; 
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// import Button from '@material-ui/core/Button';
// import Fab from '@material-ui/core/Fab';
// import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
// import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import Button from '@material-ui/core/Button';
// import Grid from '@material-ui/core/Grid/Grid';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    button: {
      margin: theme.spacing.unit
    },
    input: {
      display: 'none',
    },  
    iconSmall: {
        fontSize: 15,
      },
      margin: {
        margin: theme.spacing.unit,
      }
  });

class OnBoardingView extends React.Component {

    render() {
        const { classes } = this.props;
        return (
            <div >
                <h1>Groups</h1> 
                <Grid container spacing={24}>

                <Grid item xs={4} sm={2}>
                    <Button 
                        fullWidth
                        variant="contained" 
                        color="primary" 
                        size="large"
                        className={classes.button}
                    >
                        
                    <NavigationIcon className={(classes.iconSmall,classes.margin)} />Join
                    </Button>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Button fullWidth size="large" variant="contained" color="default" className={classes.button}>
                        <AddIcon className={(classes.iconSmall,classes.margin)} />Create
                    </Button>
                </Grid>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(OnBoardingView);