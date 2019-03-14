import React from 'react'; 
import Fab from '@material-ui/core/Fab';
import MultipleValueTextInput from 'react-multivalue-text-input';

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit,
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  });

export default class JoinGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            group_name: '', 
            bio:'',
            invitedMembers:[
                {
                    firstname:"", 
                    lastname:"", 
                    email:""
                }
            ]
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({
            name: event.target.name,
            bio: event.target.bio
        });
      }
    
      handleSubmit(event) {
        alert('A name was submitted: ' + this.state.name +  " " + this.state.bio);
        event.preventDefault();
        console.log(this.state);
      }

    render() {
        return (
            <div >
                <h1>Onboarding</h1> 
                <form onSubmit={this.handleSubmit} >

                <label>
                Clique Name
                <input type="text" value={this.state.name} onChange={this.handleChange} />
                </label>
          
                    <label>
                Invitaiton Code:
                <input type="text" value={this.state.name} onChange={this.handleChange} />
                </label>
                <label>


        
        <input type="submit" value="Submit" aria-label="Create"/> 
        </label>
        
        </form>
            <Fab variant="round" color="secondary" aria-label="Join" className={styles.margin}>
            Back
        </Fab>
            </div>
        )
    }
}