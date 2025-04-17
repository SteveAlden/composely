/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'motion/react';
import { AppWindowMac, LoaderCircle } from 'lucide-react';
import { CodeEditor } from 'react-live-runner';
import { ResizableBlock } from '@/components/custom/resizable-block';
import { ImperativePanelHandle } from 'react-resizable-panels';
import ResizeToggle from '@/components/custom/resize-toggle';
import Sandbox from '@/components/custom/sandbox';

interface ComponentViewProps {
  code: string | any;
  fileName: string;
  defaultTab?: 'preview' | 'code';
  id: string;
  isLoading?: boolean;
  reverseMenu?: boolean;
}

const ComponentView: React.FC<ComponentViewProps> = ({
  code,
  fileName,
  defaultTab = 'code',
  isLoading = false,
  reverseMenu = true,
}) => {
  const resizablePanelRef = useRef<ImperativePanelHandle | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [toggleTab, setToggleTab] = useState(defaultTab);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [code]);

  useEffect(() => {
    if (!isLoading) {
      setToggleTab('preview');
    }
  }, [isLoading]);

  const renderTabsList = useMemo(
    () => (
      <TabsList
        className={`z-20 transition-all flex rounded-full dark:bg-background dark:border-zinc-800 dark:border ${
          reverseMenu ? 'flex-row-reverse' : ''
        }`}
      >
        <TabsTrigger
          value='code'
          className='rounded-full transition-all data-[state=active]:dark:bg-primary data-[state=active]:dark:text-primary-foreground '
        >
          {fileName}
        </TabsTrigger>
        <TabsTrigger
          value='preview'
          disabled={isLoading}
          className='rounded-full transition-all data-[state=active]:dark:bg-primary data-[state=active]:dark:text-primary-foreground'
        >
          {!isLoading ? (
            <AppWindowMac className='mr-1 size-5' />
          ) : (
            <LoaderCircle className='mr-1 size-5 animate-spin' />
          )}
          Preview
        </TabsTrigger>
      </TabsList>
    ),
    [isLoading, fileName, reverseMenu]
  );

  const renderTabsContent = useMemo(
    () => (
      <>
        <TabsContent
          value='preview'
          className='mb-8 mt-4 overflow-auto mx-auto data-[state=inactive]:hidden transition-all rounded-2xl w-full'
          forceMount
        >
          <ResizableBlock resizablePanelRef={resizablePanelRef as any}>
            <Sandbox generatedCode={code} />
          </ResizableBlock>
        </TabsContent>
        <TabsContent
          value='code'
          className='mb-8 mt-4 w-full pr-3 transition-all'
        >
          {code && (
            <motion.div
              className={
                'h-[calc(100vh-(16rem+4px))] overflow-auto rounded-2xl bg-zinc-950 border border-zinc-800'
              }
              ref={containerRef}
            >
              <CodeEditor
                value={code}
                className='z-0 rounded-[--radius] font-mono'
                theme={primsaTheme as any}
                style={{ background: 'hsl(var(--background))' }}
                onFocus={(e) => (e.target.style.outline = 'none')}
                language='tsx'
                readOnly
              />
            </motion.div>
          )}
        </TabsContent>
      </>
    ),
    [code]
  );

  return (
    <motion.div className='relative mx-auto max-w-10xl pl-2'>
      <Tabs
        defaultValue={defaultTab}
        value={toggleTab}
        onValueChange={(value) => setToggleTab(value as any)}
        className='duration-1000'
      >
        <div
          className={`flex w-full items-center justify-between gap-2 ${
            reverseMenu ? 'flex-row-reverse' : ''
          }`}
        >
          <div className='flex gap-2 justify-self-start pr-3'></div>
          <div
            className={`flex gap-2 justify-self-end ${
              reverseMenu ? 'flex-row-reverse' : ''
            }`}
          >
            <AnimatePresence>
              {!isLoading && toggleTab === 'preview' && (
                <ResizeToggle resizablePanelRef={resizablePanelRef} />
              )}
            </AnimatePresence>
            {renderTabsList}
          </div>
        </div>
        {renderTabsContent}
      </Tabs>
    </motion.div>
  );
};

export default ComponentView;

const primsaTheme = {
  plain: {
    color: '#f8f8f2', // Light gray color for default text.
  },
  styles: [
    {
      types: ['changed'],
      style: {
        color: 'rgb(162, 191, 252)', // Soft blue for highlighting changed content.
        fontStyle: 'italic',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: '#f92672', // Bright pink for deleted content to grab attention.
        fontStyle: 'italic',
      },
    },
    {
      types: ['inserted'],
      style: {
        color: 'rgb(173, 219, 103)', // Light green for inserted content, indicating additions.
        fontStyle: 'italic',
      },
    },
    {
      types: ['comment'],
      style: {
        color: '#71717a', // Grayish-blue for comments to de-emphasize them visually.
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'url'],
      style: {
        color: '#a6e22e', // Bright green for strings and URLs to distinguish them clearly.
      },
    },
    {
      types: ['variable'],
      style: {
        color: '#db2777', // Vivid pink to highlight variables and ensure visibility.
      },
    },
    {
      types: ['number'],
      style: {
        color: '#7c3aed', // Purple for numbers, offering a unique differentiation.
      },
    },
    {
      types: ['builtin', 'char', 'constant', 'function', 'class-name'],
      style: {
        color: '#fdba74', // Orange for built-in elements and important identifiers.
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#f8f8f2', // Light gray for punctuation, blending subtly with the text.
      },
    },
    {
      types: ['selector', 'doctype'],
      style: {
        color: '#a6e22e', // Bright green for selectors and doctype, maintaining consistency with strings.
        fontStyle: 'italic',
      },
    },
    {
      types: ['tag', 'operator', 'keyword'],
      style: {
        color: '#38bdf8', // Bright blue for tags, operators, and keywords to make them stand out.
      },
    },
    {
      types: ['boolean'],
      style: {
        color: '#7c3aed', // Purple for booleans, consistent with numbers for a logical grouping.
      },
    },
    {
      types: ['namespace'],
      style: {
        color: 'rgb(178, 204, 214)', // Light bluish-gray for namespaces, with reduced opacity for subtlety.
        opacity: 0.7,
      },
    },
    {
      types: ['tag', 'property'],
      style: {
        color: '#f92672', // Bright pink for tags and properties, matching deleted content.
      },
    },
    {
      types: ['attr-name'],
      style: {
        color: '#a6e22e !important', // Bright green for attribute names to align with strings.
      },
    },
    {
      types: ['doctype'],
      style: {
        color: '#71717a', // Grayish-blue for doctype, matching comments.
      },
    },
    {
      types: ['rule'],
      style: {
        color: '#fdba74', // Orange for rules, consistent with constants and built-ins.
      },
    },
  ],
};
