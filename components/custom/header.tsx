import { BotMessageSquare } from 'lucide-react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <div className='fixed left-0 top-0 z-40 w-full p-2 pl-4'>
      <div className='flex justify-between'>
        <div className='flex items-center'>
          <Link
            href='/'
            className='flex items-center justify-center ml-0.5 gap-1 mt-2 font-mono text-cyan-400 text-xl'
          >
            <BotMessageSquare className='text-zinc-50 size-7' />
            Composely
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
