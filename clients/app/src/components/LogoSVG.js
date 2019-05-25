import React from 'react';
import PropTypes from 'prop-types';

function LogoSVG({ fill }) {
  return (
    <svg viewBox="0 0 16 16">
      <path
        fill={fill}
        d="M109.3,62.5c-8.5,0-15.5-7-15.5-15.3c0-8.4,7.2-15.4,15.7-15.3c8.5,0.1,15.5,7.1,15.4,15.4
		C124.8,55.6,117.8,62.5,109.3,62.5z"
      />
    </svg>
  );
}

LogoSVG.propTypes = {
  className: PropTypes.string,
  fill: PropTypes.string
};

LogoSVG.defaultProps = {
  className: undefined,
  fill: '#333'
};

export default LogoSVG;
