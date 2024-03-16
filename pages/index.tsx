import React, { useState } from 'react';
import axios from 'axios';
import PersonalizedContent from '../components/PersonalizedContent';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [userAge, setUserAge] = useState('12');
  const [userHobby, setUserHobby] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/generateContent', {
        userAge,
        userHobby,
        userLocation,
      }); 
      setGeneratedContent(response.data.content);
      setLoading(false);
    } catch (error) {
      console.error('Error generating content:', error);
    }
  };

  return (
    <div>
      <h1>Personalized Website</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Age:
          <input
            type="text"
            value={userAge}
            onChange={(e) => setUserAge(e.target.value)}
          />
        </label>
        <br />
        <label>
          Hobby:
          <input
            type="text"
            value={userHobby}
            onChange={(e) => setUserHobby(e.target.value)}
          />
        </label>
        <br />
        <label>
          Where you at:
          <input
            type="text"
            value={userLocation}
            onChange={(e) => setUserLocation(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">{ loading ? 'Processing...' : 'Generate Personalized Content'}</button>
      </form>
      {generatedContent && (
        <PersonalizedContent
          userAge={userAge}
          userHobby={userHobby}
          userLocation={userLocation}
          generatedContent={generatedContent}
        />
      )}
    </div>
  );
};

export default Home;