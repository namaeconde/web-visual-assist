import React from "react";
import { Stepper, Step, Button, Card, CardHeader, CardBody, Typography, CardFooter, Input } from "@material-tailwind/react";
import { handleAge, handleInterests, handleLocation, handleOnboarded } from "../atoms";
import { useAtom } from "jotai";

interface CardProps {
  title: string;
  content: string;
  input: string;
  handleInputChange: any;
  handleClickSubmit: any;
}

export const CardDefault: React.FC<CardProps> = ({ 
    title, 
    content, 
    input,
    handleInputChange,
    handleClickSubmit 
  }) => {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          { title }
        </Typography>
        <Typography>
          { content}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex justify-center items-center">
          <Input variant="standard" crossOrigin="" value={input} onChange={handleInputChange}/>
          <Button ripple={false} variant="text" onClick={() => handleClickSubmit()}>Submit</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export const OnboardingSection: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [age, updateAge] = useAtom(handleAge);
  const [interests, updateInterests] = useAtom(handleInterests);
  const [location, updateLocation] = useAtom(handleLocation);
  const [, markAsOnboarded] = useAtom(handleOnboarded);

  const handleNext = () => !isLastStep && setActiveSection((cur) => cur + 1);

  return (
    <div className="mx-auto max-w-screen-md w-full py-4 px-8">
      <Stepper
        activeStep={activeSection}
      >
        <Step className="h-4 w-4" onClick={() => setActiveSection(0)} />
        <Step className="h-4 w-4" onClick={() => setActiveSection(1)} />
        <Step className="h-4 w-4" onClick={() => setActiveSection(2)} />
      </Stepper>
      <div className="mt-16 flex justify-between">
        <div className="mx-auto flex items-center gap-x-2">
        { 
          activeSection === 0 ? 
            <CardDefault 
              title="Age" 
              content="Please provide your age for statistical purposes only. Must be 18 or older." 
              input={age}
              handleInputChange={updateAge}
              handleClickSubmit={handleNext}
            /> :
          activeSection === 1 ?
            <CardDefault
              title="Interests" 
              content="Please share your interests or hobbies with us. We'd love to know more about what you enjoy doing in your free time." 
              input={interests}
              handleInputChange={updateInterests}
              handleClickSubmit={handleNext}
            /> :
            <CardDefault 
              title="Location" 
              content="Where are you located?" 
              input={location}
              handleInputChange={updateLocation}
              handleClickSubmit={() => {
                handleNext();
                setIsLastStep(true);
                markAsOnboarded();
              }}
            />
        }
        </div>
      </div>
    </div>
  );
};