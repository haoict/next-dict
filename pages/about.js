import Head from 'next/head';

const About = props => {
  let title = 'About';
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <div style={{ margin: '0 8px' }}>
        <h3>About</h3>
        <p>Next Dict!! v1.0.2</p>
        <h3>Copyright Notice</h3>
        <p>Please note all data is collected by automated tool.</p>
        <h3>Assets source</h3>
        <a href='https://www.flaticon.com/authors/those-icons' title='Those Icons'>
          Those Icons
        </a>
        {' | '}
        <a href='https://www.flaticon.com/authors/pixel-perfect' title='Pixel perfect'>
          Pixel perfect
        </a>
        {' | '}
        <a href='https://www.flaticon.com/authors/roundicons' title='Roundicons'>
          Roundicons
        </a>
      </div>
    </>
  );
};

export default About;
