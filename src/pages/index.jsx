import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql, Link } from 'gatsby';
import styled from 'react-emotion';
import { Layout, Carousel } from 'antd';
import { ArrowRightOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import theme from '../../config/theme';
import CustomHeader from '../components/Header';
import CustomLayout from '../components/Layout';
import SideMenu from '../components/SideMenu';

const StyledCustomHeightDiv = styled.div`
  height: 600px;
  color: ${theme.colors.text};
  text-align: center;
  background-color: ${theme.colors.greyMedium};
`;

const CustomCarousel = styled(Carousel)`
  .slick-prev,
  .slick-next {
    color: ${theme.colors.text};
    font-size: 33pt;
    z-index: 1;
  }
  .slick-prev {
    margin-left: 20px;
  }
  .slick-next {
    margin-right: 42px;
  }

  .slick-prev:hover,
  .slick-next:hover,
  .slick-prev:focus,
  .slick-next:focus {
    color: ${theme.colors.greyDark};
  }
`;

const IndexPage = ({
  data: {
    caseStudies: { edges },
  },
}) => {
  return (
    <CustomLayout>
      <CustomHeader />
      <Layout>
        <SideMenu />
        <Layout.Content style={{ background: theme.bg, margin: '24px 16px 0' }}>
          <CustomCarousel
            autoplay
            arrows
            dotPosition="bottom"
            nextArrow={<h1></h1>}
            prevArrow={<h1>←</h1>}
          >
            {edges.map(c => (
              <StyledCustomHeightDiv>
                <img
                  style={{ width: '100%', height: '100%' }}
                  key={c.node.uid}
                  alt={c.node.data.subtitle.text}
                  src={c.node.data.header_image.localFile.childImageSharp.fluid.src}
                />
              </StyledCustomHeightDiv>
            ))}
          </CustomCarousel>
        </Layout.Content>
      </Layout>
      <Layout.Footer style={{ background: theme.bg, textAlign: 'center' }}>
        Alexandar Gligorijevich © 2020 <br /> Made by Fernando Aguilar
      </Layout.Footer>
    </CustomLayout>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.shape({
    caseStudies: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
};

export const pageQuery = graphql`
  query IndexQuery {
    caseStudies: allPrismicCaseStudy(sort: { fields: [last_publication_date], order: DESC }) {
      edges {
        node {
          uid
          data {
            header_image {
              localFile {
                childImageSharp {
                  fluid(quality: 100, traceSVG: { color: "#021212" }, cropFocus: ENTROPY) {
                    ...GatsbyImageSharpFluid_withWebp_tracedSVG
                  }
                }
              }
            }
            title {
              text
            }
            subtitle {
              text
            }
          }
        }
      }
    }
  }
`;
