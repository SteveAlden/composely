import { ReactNode } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '../ui/resizable';
import { ImperativePanelHandle } from 'react-resizable-panels';

interface ResizableBlockProps {
  resizablePanelRef: React.RefObject<ImperativePanelHandle> | null;
  children: ReactNode;
}

export const ResizableBlock = ({
  resizablePanelRef,
  children,
}: ResizableBlockProps) => {
  return (
    <div className='h-[--height] group-data-[view=code]/block-view-wrapper:hidden transition-all'>
      <div className='grid w-full gap-4'>
        <ResizablePanelGroup direction='horizontal' className='relative z-10'>
          <ResizablePanel
            ref={resizablePanelRef}
            className='relative rounded-2xl bg-background md:aspect-auto transition-all'
            defaultSize={100}
            minSize={30}
          >
            {children}
          </ResizablePanel>
          <ResizableHandle className='relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:translate-x-[-1px] after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block' />
          <ResizablePanel
            defaultSize={0}
            minSize={0}
            className='transition-all'
          />
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
