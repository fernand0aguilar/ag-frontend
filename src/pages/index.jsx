import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Carousel, { Dots } from '@brainhubeu/react-carousel';
import styled from 'react-emotion';
import MenuBar from '../components/SideMenu';

import '@brainhubeu/react-carousel/lib/style.css';

import Header from '../components/Header';
import Layout from '../components/Layout';

const StyledCustomHeightDiv = styled.div`
  height: ${window.screen.height - 600};
`;

const IndexPage = ({
  data: {
    caseStudies: { edges },
  },
}) => {
  const [value, setValue] = useState(0);

  const onChange = param => {
    setValue(param);
  };
  return (
    <Layout>
      <Header />
      <MenuBar value={value} onChange={setValue} />
      <Carousel value={value} onChange={onChange} plugins={['arrows', 'infinite', 'fastSwipe']}>
        {edges.map(c => (
          <StyledCustomHeightDiv>
            <img
              key={c.node.uid}
              alt={c.node.data.subtitle.text}
              src={c.node.data.header_image.localFile.childImageSharp.fluid.src}
            />
          </StyledCustomHeightDiv>
        ))}
      </Carousel>
      {/* <Footer /> */}
    </Layout>
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
                  fluid(
                    maxWidth: 1920
                    maxHeight: 900
                    quality: 90
                    traceSVG: { color: "#021212" }
                    cropFocus: ENTROPY
                  ) {
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
