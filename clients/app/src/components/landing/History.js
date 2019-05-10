import React from 'react';
import fastForward from '../../img/fastforward.svg';
import lock from '../../img/lock.svg';
import friends from '../../img/friends.svg';
import laptop from '../../img/laptop.svg';
import Explainers from './Explainers';

const items = [
  { icon: lock, alt: 'secure', text: 'Securely send money' },
  { icon: fastForward, alt: 'faster', text: 'Pay off loans faster' },
  {
    icon: friends,
    alt: 'friends',
    text: 'Mutually support your friends, no matter the distance'
  },
  {
    icon: laptop,
    alt: 'laptop',
    text: 'Have convenient access to the web service'
  }
];

class History extends React.Component {
  render() {
    return (
      <div>
        <Explainers title="Why use Clique" items={items} />
      </div>
    );
  }
}

export default History;
