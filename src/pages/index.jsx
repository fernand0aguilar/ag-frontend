import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'react-emotion';

import { Layout, Carousel, Menu } from 'antd';
import theme from '../../config/theme';

import CustomHeader from '../components/Header';
import CustomLayout from '../components/Layout';

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;

const StyledCustomHeightDiv = styled.div`
  height: 600px;
  color: ${theme.colors.text};
  text-align: center;
  background-color: ${theme.colors.greyMedium};
`;

const CustomSider = styled(Sider)`
  background-color: ${theme.colors.greyMedium};
`;

const IndexPage = ({
  data: {
    caseStudies: { edges },
  },
}) => {
  const [current, setCurrent] = useState(0);

  const handleClick = e => {
    setCurrent({
      current: e.key,
    });
  };

  return (
    <CustomLayout>
      <CustomSider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        theme="light"
      >
        <div className="logo" />
        <Menu
          theme="light"
          onClick={handleClick}
          style={{}}
          defaultOpenKeys={['sub1']}
          selectedKeys={[current]}
          mode="inline"
        >
          <SubMenu key="sub1" title="Navigation One">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title="Navigation Two">
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub4" title="Navigation Three">
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </CustomSider>
      <Layout>
        <CustomHeader />
        <Content style={{ background: theme.bg, margin: '24px 16px 0' }}>
          <Carousel autoplay>
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
          </Carousel>
        </Content>
        <Footer style={{ background: theme.bg, textAlign: 'center' }}>
          Alexandar Gligorijevich © 2020 Created by Fernando Aguilar
        </Footer>
      </Layout>
      {/* <Layout>
        <CustomHeader />
        <MenuBar value={value} setValue={setValue} />
        
        <Footer />
      </Layout> */}
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
                  fluid(
                    quality: 100
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
