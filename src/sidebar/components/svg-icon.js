'use strict';

const { createElement } = require('preact');
const { useLayoutEffect, useRef } = require('preact/hooks');
const propTypes = require('prop-types');

// The list of supported icons
const icons = {
  'add-group': require('../../images/icons/add-group.svg'),
  'collapse-menu': require('../../images/icons/collapse-menu.svg'),
  'expand-menu': require('../../images/icons/expand-menu.svg'),
  copy: require('../../images/icons/copy.svg'),
  cursor: require('../../images/icons/cursor.svg'),
  leave: require('../../images/icons/leave.svg'),
  refresh: require('../../images/icons/refresh.svg'),
  share: require('../../images/icons/share.svg'),
};

/**
 * Component that renders icons using inline `<svg>` elements.
 * This enables their appearance to be customized via CSS.
 *
 * This matches the way we do icons on the website, see
 * https://github.com/hypothesis/h/pull/3675
 */
function SvgIcon({ name, className = '' }) {
  if (!icons[name]) {
    throw new Error(`Unknown icon ${name}`);
  }
  const markup = { __html: icons[name] };

  const element = useRef();
  useLayoutEffect(() => {
    const svg = element.current.querySelector('svg');
    svg.setAttribute('class', className);
  }, [
    className,
    // `markup` is a dependency of this effect because the SVG is replaced if
    // it changes.
    markup,
  ]);

  return <span dangerouslySetInnerHTML={markup} ref={element} />;
}

SvgIcon.propTypes = {
  /** The name of the icon to load. */
  name: propTypes.string,

  /** A CSS class to apply to the `<svg>` element. */
  className: propTypes.string,
};

module.exports = SvgIcon;
