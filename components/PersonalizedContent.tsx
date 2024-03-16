import React from 'react';

interface PersonalizedContentProps {
  userAge: string;
  userHobby: string;
  userLocation: string;
  generatedContent: string;
}

const PersonalizedContent: React.FC<PersonalizedContentProps> = ({
  userAge,
  userHobby,
  userLocation,
  generatedContent,
}) => {
  return (
    <div
      style={{
        padding: '2rem',
        borderRadius: '0.5rem',
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: generatedContent }} />
    </div>
  );
};

export default PersonalizedContent;