import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import { Link } from 'gatsby';
import { Flex } from 'grid-emotion';

const Wrapper = styled.header`
  background-color: ${props => props.theme.colors.bg};
  color: ${props => props.theme.colors.text};
  a {
    color: ${props => props.theme.colors.text};
    &:hover {
      color: ${props => props.theme.colors.primaryLight};
    }
  }
`;

const Inner = styled(Flex)`
  @media (max-width: ${props => props.theme.breakpoint.l}) {
    justify-content: center;
    flex-direction: column;
    text-align: center;
    div:last-child {
      margin-top: 1rem;
    }
  }
`;

const StyledLink = styled(Link)`
  transform: translateX(0);
  z-index: 1;
  transition: all 200ms ease-out;
  &:before {
    content: '←';
    padding-right: 8px;
  }
  &:hover {
    color: ${props => props.theme.colors.bg};
    transform: translateX(-6px);
  }
`;

const Logo = styled.h1`
  position: absolute;
  top: 3px;
  left: 0;
  right: 0;
  text-align: center;
`;

const Header = ({ isCase }) => {
  const menu = isCase ? (
    <React.Fragment>
      <StyledLink to="/">Return to Home</StyledLink>
      <Link to="/">
        <Logo>Alexandar Gligorijevich</Logo>
      </Link>
      <StyledLink to="/">Back</StyledLink>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Logo>
        <Link to="/">Alexandar Gligorijevich</Link>
      </Logo>
    </React.Fragment>
  );

  return (
    <div>
      <Wrapper>
        <Inner justifyContent="space-between" p={4}>
          {menu}
        </Inner>
      </Wrapper>
    </div>
  );
};

export default Header;

Header.propTypes = {
  isCase: PropTypes.bool,
};

Header.defaultProps = {
  isCase: false,
};
