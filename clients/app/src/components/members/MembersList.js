import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SimpleCard from '../SimpleCard';
import Member from './Member';

const members = [
  {
    title: 'Requesting Early Payment',
    description: 'I need to get paid this month for...',
    time: '25 min ago',
    author: 'John Smith',
    authorImg: 'https://v3-0-0.material-ui.com/static/images/remy.jpg'
  },
  {
    title: 'Requesting Early Payment',
    description: 'I need to get paid this month for...',
    time: '50 min ago',
    author: 'Sam Lou',
    authorImg: 'https://v3-0-0.material-ui.com/static/images/uxceo-128.jpg'
  },
  {
    title: 'Requesting Early Payment',
    description: 'I need to get paid this month for...',
    time: '25 min ago',
    author: 'John Smith',
    authorImg: 'https://v3-0-0.material-ui.com/static/images/remy.jpg'
  },
  {
    title: 'Requesting Early Payment',
    description: 'I need to get paid this month for...',
    time: '50 min ago',
    author: 'Sam Lou',
    authorImg: 'https://v3-0-0.material-ui.com/static/images/uxceo-128.jpg'
  },
  {
    title: 'Requesting Early Payment',
    description: 'I need to get paid this month for...',
    time: '25 min ago',
    author: 'John Smith',
    authorImg: 'https://v3-0-0.material-ui.com/static/images/remy.jpg'
  },
  {
    title: 'Requesting Early Payment',
    description: 'I need to get paid this month for...',
    time: '50 min ago',
    author: 'Sam Lou',
    authorImg: 'https://v3-0-0.material-ui.com/static/images/uxceo-128.jpg'
  }
];

const styles = theme => ({
  // card: {
  //   padding: 25
  // }
});

class MembersList extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        {members.map((member, index) => {
          return (
            <SimpleCard key={index}>
              <Member
                key={index}
                elemNum={index < members.length - 1}
                title={member.title}
                author={member.author}
                time={member.time}
                authorImg={member.authorImg}
              />
            </SimpleCard>
          );
        })}
      </div>
    );
  }
}

export default withStyles(styles)(MembersList);
