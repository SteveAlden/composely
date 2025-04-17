/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { Monitor, Tablet, Smartphone } from 'lucide-react';
import { motion } from 'motion/react';

const ResizeToggle: React.FC<any> = ({ resizablePanelRef }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
    >
      <div className='hidden h-9 items-center gap-1.5 rounded-full p-1 shadow-none lg:flex bg-background border'>
        <ToggleGroup
          type='single'
          defaultValue='100'
          onValueChange={(value) => {
            if (resizablePanelRef?.current) {
              resizablePanelRef.current.resize(parseInt(value));
            }
          }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value='30'
                className='size-7 rounded-full p-0 hover:bg-transparent hover:text-cyan-500 cursor-pointer'
              >
                <Smartphone />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mobile</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value='60'
                className='size-7 rounded-full p-0 hover:bg-transparent hover:text-cyan-500 cursor-pointer'
              >
                <Tablet />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tablet</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value='100'
                className='size-7 rounded-full p-0 hover:bg-transparent hover:text-cyan-500 cursor-pointer'
              >
                <Monitor className='' />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <p>Desktop</p>
            </TooltipContent>
          </Tooltip>
        </ToggleGroup>
      </div>
    </motion.div>
  );
};

export default ResizeToggle;
