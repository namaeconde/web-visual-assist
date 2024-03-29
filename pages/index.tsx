import React, { useEffect } from 'react';
import { StickyNavbar } from '../components/StickyNavBar';
import { Card, Typography } from '@material-tailwind/react';
import { OnboardingSection } from '../components/OnboardingSection';
import { handleOnboarded, handleAge, handleInterests, handleLocation } from '../atoms';
import { useAtom } from 'jotai';
import axios from 'axios';
import { SectionCard, SectionCardProps, SkeletonSectionCard } from '../components/SectionCard';

const Content = () => {
  const [age] = useAtom(handleAge);
  const [interests] = useAtom(handleInterests);
  const [location] = useAtom(handleLocation);
  const [title, setTitle] = React.useState(null);
  const [sections, setSections] = React.useState<SectionCardProps[]>([]);

  useEffect(() => {
    axios
     .post('/api/generateContent', {
      userAge: age,
      userHobby: interests,
      userLocation: location,
     })
     .then((res) => {
        const { title, body } = res.data.content;
        setTitle(title);
        body?.slice(0, 3)?.forEach((data: { section: string, content: string }) => {
          setSections((currentSections: SectionCardProps[]) => [
            ...currentSections,
            { title: data.section, content: data.content }
          ]);
        });
      });
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl py-12">
      <Card className="mb-12 overflow-hidden">
        <img
          alt="nature"
          className="h-[32rem] w-full object-cover object-center"
          src={`https://source.unsplash.com/random/?${title}&auto=format&fit=crop&w=2717&q=80`}
        />
      </Card>
      {
        title ? 
          <Typography variant="h2" color="blue-gray" className="mb-2">
            { title }
          </Typography>
          : 
          <Typography
            as="div"
            variant="h1"
            className="mb-4 h-5 w-100 rounded-full bg-gray-300 animate-pulse"
          >
            &nbsp;
          </Typography>
      }
      <div className="flex flex-row gap-4 justify-center">
        {
          sections.length > 0 ?
            sections.map((section, index) => {
              const { title, content } = section;
              return (
                <SectionCard
                  title={title}
                  content={content}
                  key={`section-${index}`}
                />
              )
            })
            : 
            <>
              <SkeletonSectionCard />
              <SkeletonSectionCard />
              <SkeletonSectionCard />
            </>
        }
      </div>
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