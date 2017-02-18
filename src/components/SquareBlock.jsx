import React from 'react';

import './SquareBlock.css';

/**
 * Building block for Tetrominoes and the grid of the Well, occupying a 1x1
 * square block. The only configurable property square blocks have is their
 * color.
 */
const SquareBlock = ({ color }) => (
  <div
    className="square-block"
    style={{ backgroundColor: color }}
  />
);

SquareBlock.propTypes = {
  color: React.PropTypes.string.isRequired,
};

export default SquareBlock;
