'use client';

import React, { useEffect } from 'react';
import { StickyNavbar } from '../components/StickyNavBar';
import { Card, Typography } from '@material-tailwind/react';
import { OnboardingSection } from '../components/OnboardingSection';
import { handleOnboarded, handleAge, handleInterests, handleLocation } from '../atoms';
import { useAtom } from 'jotai';
import { useChat } from 'ai/react';
import { SectionCard, SectionCardProps, SkeletonSectionCard } from '../components/SectionCard';
import axios from 'axios';

export const runtime = 'experimental-edge';

const AIContent = () => {
  const [age] = useAtom(handleAge);
  const [interests] = useAtom(handleInterests);
  const [location] = useAtom(handleLocation);
  const [sections, setSections] = React.useState<SectionCardProps[]>([]);

  const { messages: title, append: generateTitle } = useChat({ api: "/api/claude-3-opus" });

  const getTitlePrompt = `Generate a personalized content for a person who is ${age} years old in ${location} and loves ${interests}. 
                  The title should be related to finance that is engaging, informative, and tailored to their interests.
                  Do not mention the person's age, location, or hobby.
                  Your response should be the title alone with no quotation marks.`;

  useEffect(() => {
    if (age && interests && location && title.length === 0) {
      generateTitle({
        content: getTitlePrompt,
        role: 'user',
        createdAt: new Date(),
      });
    }

    // TODO: Update sections to streaming
    // if (age && interests && location && sections.length === 0) {
    //   axios
    //   .post('/api/generateContent', {
    //    userAge: age,
    //    userHobby: interests,
    //    userLocation: location,
    //   })
    //   .then((res) => {
    //      const { sections } = res.data.content;
    //      sections?.slice(0, 3)?.forEach((data: { title: string, content: string }) => {
    //        setSections((currentSections: SectionCardProps[]) => [
    //          ...currentSections,
    //          { title: data.title, content: data.content }
    //        ]);
    //      });
    //    });
    // }
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl py-12">
      <Card className="mb-12 overflow-hidden">
        <img
          alt="nature"
          className="h-[32rem] w-full object-cover object-center"
          src={`https://source.unsplash.com/random/?${interests}&auto=format&fit=crop&w=2717&q=80`}
        />
      </Card>
      {
        // TODO: Use Suspense component from nextjs
        title?.length > 1 ? 
          <Typography variant="h2" color="blue-gray" className="mb-2">
            { title?.at(-1)?.content }
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
  return isOnboarded ? <AIContent /> : <OnboardingSection />
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