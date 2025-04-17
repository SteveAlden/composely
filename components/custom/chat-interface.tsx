/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useRef, useState } from 'react';
import ComponentView from '@/components/custom/preview';
import { formatCode } from '@/lib/utils';
import MultimodalInput from '@/components/custom/input';
import { useChat } from '@ai-sdk/react';
import { motion } from 'motion/react';
import { MousePointerClick } from 'lucide-react';

interface ChatInterfaceProps {
  id: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { input, setInput, messages, handleSubmit, status, stop } = useChat({
    id,
    experimental_throttle: 100,
  });

  useEffect(() => {
    if (status === 'streaming') {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const resetInput = () => {
    setInput('');
  };

  const handleFormSubmit = () => {
    handleSubmit();
    resetInput();
  };

  const renderMessageContent = (message: any, index: number) => {
    if (message.role === 'user') {
      return (
        <div className='flex flex-col items-end w-full gap-2'>
          <div className='flex rounded-lg px-3 py-2 text-sm bg-primary text-primary-foreground max-w-[80%] items-center'>
            {message?.content
              ?.replace(/^input:\s*/, '')
              ?.includes(', selectedElementId:') ? (
              <>
                <div className='p-1 px-2 mr-1 ml-0 rounded-full bg-primary-foreground text-primary'>
                  <MousePointerClick className='size-3 scale-125' />
                </div>
                {
                  message.content
                    .replace(/^input:\s*/, '')
                    .split(', selectedElementId:')[0]
                }
              </>
            ) : (
              message?.content?.replace(/^input:\s*/, '')
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className='flex rounded-lg px-3 py-2 text-sm bg-transparent text-secondary-foreground w-full'>
          <div className='flex items-start w-full'>
            <div className='w-full transition-all'>
              <ComponentView
                code={formatCode(message.content)}
                fileName={'Code'}
                id={message.id}
                isLoading={isLoading && messages.length === index + 1}
                reverseMenu={true}
              />
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className={`w-full px-0 md:px-1 h-full bg-zinc-950 border border-zinc-800 overflow-auto rounded-4xl pb-[calc(4rem+8px)] md:pb-16`}
    >
      <div className='relative w-full max-w-10xl rounded-lg mx-auto'>
        {!!messages.length && (
          <div className='p-4 pl-0 md:pl-1 space-y-3 w-full'>
            {messages.map((message: any, index: number) => (
              <div
                key={message.id}
                className={`flex flex-col w-full ${
                  message.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {renderMessageContent(message, index)}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
        {!isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className='pb-20' />
        )}
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className='p-4 pl-0 md:pl-1 mt-[-2rem] space-y-3 w-full pb-20'>
            <div className='flex flex-col w-full items-start'>
              <div className='flex rounded-lg px-3 py-2 text-sm bg-transparent text-secondary-foreground w-[98%]'>
                <div className='flex items-start gap-1 w-full'>
                  <div className='w-full pl-0 text-base text-muted-foreground pt-1 animate-pulse-fast'>
                    <div className='inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 pl-1'>
                      composely is thinking...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <MultimodalInput
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        handleFormSubmit={handleFormSubmit}
        isInitialMessage={!messages.length}
        stop={stop}
      />
    </motion.div>
  );
};

export default ChatInterface;
