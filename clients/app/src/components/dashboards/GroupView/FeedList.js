import React, { Component } from 'react';
import Feed from './Feed';

const feeds = [
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
class FeedList extends Component {
  render() {
    return (
      <div>
        {feeds.map((feed, index) => {
          return (
            <Feed
              key={index}
              elemNum={index < feeds.length - 1}
              title={feed.title}
              description={feed.description}
              author={feed.author}
              time={feed.time}
              authorImg={feed.authorImg}
            />
          );
        })}
      </div>
    );
  }
}

export default FeedList;
