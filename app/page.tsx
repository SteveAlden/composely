import ChatInterface from '@/components/custom/chat-interface';
import { generateId } from 'ai';

export default async function Page() {
  const id = generateId();

  return (
    <div className='h-full w-full'>
      <ChatInterface id={id} />
    </div>
  );
}
