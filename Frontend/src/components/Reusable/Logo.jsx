import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

Logo.propTypes = {
  style: PropTypes.string,
  source: PropTypes.string,
  link: PropTypes.string,
};

function Logo({ style, source, link }) {
  return (
    <Link to={link}>
      <img src={source} className={style} />
    </Link>
  );
}

export default Logo;
