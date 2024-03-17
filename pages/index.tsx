import React from 'react';
import { StickyNavbar } from '../components/StickyNavBar';
import { Card, Typography } from '@material-tailwind/react';
import { OnboardingSection } from '../components/OnboardingSection';
import { handleOnboarded } from '../atoms';
import { useAtom } from 'jotai';

const Content = () => {
  return (
    <div className="mx-auto max-w-screen-md py-12">
      <Card className="mb-12 overflow-hidden">
        <img
          alt="nature"
          className="h-[32rem] w-full object-cover object-center"
          src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
        />
      </Card>
      <Typography variant="h2" color="blue-gray" className="mb-2">
        Hello World!
      </Typography>
      <Typography color="gray" className="font-normal">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus dignissim mi sit amet iaculis. 
        Proin id risus tincidunt augue euismod dictum et vel nisl. Donec at semper lectus, non condimentum velit. 
        Etiam varius ut orci a viverra. Donec tristique magna odio, eget auctor dolor varius sed. Cras ac maximus est. 
        Mauris id aliquet risus. Vivamus venenatis neque eros, sed consectetur ligula facilisis ac. 
        Integer congue eros vitae ipsum malesuada, nec venenatis mi hendrerit.
      </Typography>
      <Typography color="gray" className="font-normal mt-4">
        Curabitur interdum eu urna id fermentum. Aenean dignissim tincidunt vehicula. 
        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
        Sed accumsan, mauris eu elementum fringilla, augue tortor sollicitudin est, pretium scelerisque est mi congue libero. 
        Nam felis lacus, vestibulum in placerat at, aliquam nec lacus. Nam fermentum blandit lacus. 
        Curabitur sit amet ipsum ac metus vestibulum finibus. Sed vestibulum viverra tortor imperdiet vestibulum. 
        Phasellus gravida, ante non semper pellentesque, dui ante maximus diam, a posuere nunc ipsum at tortor. 
        Integer et dolor sit amet orci mattis dignissim. Cras nec facilisis sem. Ut eget sollicitudin lectus. 
        Suspendisse vitae aliquet lectus, id bibendum justo. Sed auctor sit amet dui ac elementum. 
        Aliquam facilisis dolor nec libero maximus, in suscipit ligula suscipit.
      </Typography>
    </div>
  )
};

const Header = () => { return <StickyNavbar headerList={['About us', 'Products', 'Help']}/>}
const Body = () => {
  const [isOnboarded] = useAtom(handleOnboarded);
  return isOnboarded ? <Content /> : <OnboardingSection />
}
const Footer = () => { return <></> }

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Body />
      <Footer />
    </>
  );
};

export default Home;