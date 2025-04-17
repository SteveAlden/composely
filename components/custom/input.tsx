import {
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useEffect,
  FormEvent,
} from 'react';
import { Sparkles, Square } from 'lucide-react';
import { Button, Textarea } from '@/components/ui';
import { motion } from 'motion/react';

interface InputProps {
  // Handlers
  stop: () => void;

  // States
  isLoading: boolean;
  isInitialMessage: boolean;

  // Data
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;

  handleFormSubmit: () => void;
}

const Input: React.FC<InputProps> = ({
  isLoading,
  input,
  setInput,
  isInitialMessage,
  stop,
  handleFormSubmit,
}) => {
  const placeholder = isInitialMessage
    ? 'Describe the email template you want to create...'
    : 'Provide details to enhance the template...';
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    if (textareaRef.current && input === '') {
      textareaRef.current.style.height = 'auto';
    }
  }, [input]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleFormSubmit();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormSubmit();
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className='fixed bottom-6 left-0 md:left-14 w-full pb-0.5 pr-0 md:pr-12 z-40'
    >
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 200 }}
        transition={{ duration: 0.45 }}
        className='mx-auto flex w-11/12 max-w-3xl flex-col items-center space-x-2 h-full'
      >
        <div className='relative flex w-full h-full'>
          <div className='relative flex w-full flex-col items-center justify-between gap-1 h-full'>
            <div className='relative w-full group border-2 rounded-3xl focus-visible:ring-border dark:focus-visible:ring-border hover:ring-border shadow-md shadow-cyan-600 outline-none backdrop-blur-lg transition-all hover:ring-1 focus-visible:border-transparent focus-visible:shadow-lg focus-visible:shadow-cyan-600 focus-visible:ring-2 overflow-hidden focus-within:shadow-lg focus-within:shadow-cyan-600 bg-background/50 dark:bg-background'>
              <Textarea
                ref={textareaRef}
                placeholder={placeholder}
                disabled={isLoading}
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className='relative focus-visible:ring-0 shadow-none border-0 mb-12 mt-1 resize-none min-h-6 max-h-[200px] pb-0 dark:bg-background'
              />
              <div className='absolute bottom-1 right-1 flex justify-between items-center'>
                <Button
                  type='button'
                  disabled={!isLoading && !input}
                  className='h-10 w-20 rounded-full transition-all hover:border-2'
                  variant={!isLoading && !input ? 'secondary' : 'default'}
                  onClick={isLoading ? stop : onSubmit}
                >
                  {isLoading ? (
                    <Square className='animate-pulse' />
                  ) : (
                    <Sparkles />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </form>
  );
};

export default Input;
