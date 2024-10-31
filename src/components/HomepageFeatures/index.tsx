import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { Button, Hero } from '@algolia/ui-library';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  const { withBaseUrl } = useBaseUrlUtils();
  const { colorMode } = useColorMode();

  return (
    // <section className={styles.features}>
    //   <div className="container">
    //     <div className="row">
    //       {FeatureList.map((props, idx) => (
    //         <Feature key={idx} {...props} />
    //       ))}
    //     </div>
    //   </div>
    // </section>

    <div id="tailwind">
      <Hero
        id="hero"
        title={
          <>
            {/* <DocSearchLogo width="100%" /> */}
            <span className="hero-title text-3xl leading-9 font-extrabold md:text-3xl lg:text-3xl md:leading-10 max-w-xxs inline-block">
              Free Algolia Search For Developer Docs
            </span>
          </>
        }
        background="curves"
        cta={[
          <Button
            key="get-started"
            href={withBaseUrl('docs/what-is-docsearch')}
          >
            Get started
          </Button>,
          <Button
            key="apply"
            href={withBaseUrl('apply')}
            background="blue"
            color="white"
            className="apply-button"
          >
            Apply
          </Button>,
        ]}
      />
    </div>
  );
}
