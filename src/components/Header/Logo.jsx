import React from 'react';
import { Link } from "gatsby";

import './Logo.scss';

const Logo = ({ title }) => <Link to="/" activeClassName="logo--landing"><div className="logo monospace">{title}</div></Link>;

export default Logo;
