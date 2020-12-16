import Typography from 'typography';

const typography = new Typography({
  title: 'Gatsby Starter Portfolio Bella',
  baseFontSize: '12px',
  baseLineHeight: 1.45,
  headerFontFamily: [
   'Montserrat Bold'
  ],
  bodyFontFamily: [
    'Montserrat'
  ],
  googleFonts: [
    {
      name: 'Montserrat',
      styles: ['400'],
    },
  ],
  scaleRatio: 3.998,
  headerWeight: 900,
  overrideStyles: () => ({
    img: {
      marginBottom: 0,
    },
  }),
});

export default typography;
