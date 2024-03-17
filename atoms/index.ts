import { atom } from 'jotai';

const age = atom('18');
const interests = atom('sports, music, travel');
const location = atom('Melbourne, Australia');
const onboarded = atom(false);

export const handleAge = atom(
  (get) => get(age),
  (get, set, update: string) => {
    set(age, update);
  }
)

export const handleInterests = atom(
  (get) => get(interests),
  (get, set, update: string) => {
    set(interests, update);
  }
)

export const handleLocation = atom(
  (get) => get(location),
  (get, set, update: string) => {
    set(location, update);
  }
)

export const handleOnboarded = atom(
  (get) => get(onboarded),
  (get, set) => {
    set(onboarded, true);
  }
);