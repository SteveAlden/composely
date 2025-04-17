'use client';
import { Preview } from '@react-email/components';

export default function Home() {
  return (
    <>
      Hey
      <Email />
    </>
  );
}

const Email = () => {
  return <Preview>Email preview text</Preview>;
};
