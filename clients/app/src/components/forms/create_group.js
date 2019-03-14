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

export default class CreateGroup extends React.Component {

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
      }

    render() {
        return (
            <div >
                <h1>Create</h1> 
                <form onSubmit={this.handleSubmit} >

                    <label>
                        Name:
                        <input type="text" value={this.state.name} onChange={this.handleChange} />
                    </label>
                
                    <label>
                        Bio:
                        <textarea value={this.state.bio} onChange={this.handleChange}>
            
                        </textarea>
                    </label>

                    <label>
                        Invite trusted members:
                        <input type="text" value={this.state.name} onChange={this.handleChange} />
                    </label>
                    <MultipleValueTextInput 
            onItemAdded={(item, allItems) => console.log(`Item added: ${item}`)}
            onItemDeleted={(item, allItems) => console.log(`Item removed: ${item}`)}   
            label="Items"
            name="Item-input"
            placeholder="Enter Email address to Invite members"
        />
                    <input type="submit" value="Submit" aria-label="Create"/> 
                </form>
                <Fab variant="round" color="secondary" aria-label="Join" className={styles.margin}>
                    Back
                </Fab>
            </div>
        )
    }
}