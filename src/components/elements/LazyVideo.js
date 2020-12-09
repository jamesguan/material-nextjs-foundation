import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const placeHolder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

const Video = styled.video`
  display: block;
  // Load with a smooth animation
  @keyframes loaded {
    0% {
      opacity: 0.1;
    }
    100% {
      opacity: 1;
    }
  }
  // Prevent style regenerating by using utilitary classes instead of props
  &.loaded:not(.has-error) {
    animation: loaded 300ms ease-in-out;
  }
  &.has-error {
    // fallback to placeholder on error, this can be anything you set
    content: url(${placeHolder});
  }
`;

const LazyVideo = ({ className, src, type, ...props }) => {
  const [videoSrc, setVideoSrc] = useState(placeHolder);
  const [videoRef, setVideoRef] = useState();

  const onLoad = event => {
    event.target.classList.add('loaded');
  };

  const onError = event => {
    event.target.classList.add('has-error');
  };

  useEffect(() => {
    let observer;
    let cancelled = false;

    if (videoRef && videoSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !cancelled &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setVideoSrc(src);
                observer.unobserve(videoRef);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '75%',
          }
        );
        observer.observe(videoRef);
      } else {
        // Old browsers fallback
        setVideoSrc(src);
      }
    }
    return () => {
      cancelled = true;
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(videoRef);
      }
    };
  }, [src, videoSrc, videoRef]);
  return (
    <Video
      className={className}
      ref={setVideoRef}
      src={videoSrc}
      onLoad={onLoad}
      onError={onError}
      type={type}
      {...props}
    />
  );
};

LazyVideo.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
  type: PropTypes.string,
};

LazyVideo.defaultProps = {
  className: '',
  src: '',
  alt: '',
  type: 'video/mov',
};

export default LazyVideo;