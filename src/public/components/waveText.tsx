'use client';
import React from 'react';

interface WaveTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function WaveText({
  children,
  className = '',
  delay = 100,
  duration = 600
}: WaveTextProps) {

  // Hàm đệ quy lấy text trong ReactNode
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join('');
    if (React.isValidElement(node)) return extractText(node.props.children);
    return '';
  };

  const fullText = extractText(children);
  const chars = fullText.split('');

  return (
    <div className={className}>
      {chars.map((char, index) => (
        <span
          key={index}
          style={{
            display: 'inline-block',
            animation: `waveUp ${duration}ms ease-out ${index * delay}ms both, colorPulse 3s infinite ease-in-out`,
          }}
          className='font-black text-[20px] lg:text-[44px] xl:text-[64px] uppercase'
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
        
      ))}
    </div>
  );
}
