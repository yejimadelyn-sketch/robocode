import React from 'react';
import { Link } from 'react-router-dom';
import { playPopSound } from '../utils/sound';

/**
 * SoundButton is a wrapper around the standard HTML button
 * It automatically triggers the satisfying UI pop sound on click.
 */
export const SoundButton = ({ children, onClick, className, style, disabled, type = 'button', ...props }) => {
  const handleClick = (e) => {
    if (!disabled) {
      playPopSound();
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button 
      type={type}
      className={className} 
      style={style} 
      onClick={handleClick} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

/**
 * SoundLink is a wrapper around React Router's Link
 */
export const SoundLink = ({ children, onClick, to, className, style, ...props }) => {
  const handleClick = (e) => {
    playPopSound();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link 
      to={to}
      className={className} 
      style={style} 
      onClick={handleClick} 
      {...props}
    >
      {children}
    </Link>
  );
};
